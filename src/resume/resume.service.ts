import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeDto } from './dtos/create-resume.dto';
import { UpdateResumeDto } from './dtos/update-resume.dto';
import { Resume } from './entities/resume.entity';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';
import { UserService } from 'src/user/user.service';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createResumeDto: CreateResumeDto,
    userId: number,
    files: Record<string, Express.Multer.File[]>,
  ): Promise<Resume> {
    // Handle file uploads for uploadable fields
    const uploadableFields = [
      'image',
      'resumeFile',
      'resumeOriginalFile',
      'coverPhotos',
      'images',
    ];
    const uploadDirectory = 'uploads/resumes';

    uploadableFields.forEach((field) => {
      if (files[field]) {
        const uploadedFiles = files[field].map((file) =>
          this.fileUploadService.getFilePath(uploadDirectory, file.filename),
        );
        createResumeDto[field] = Array.isArray(createResumeDto[field])
          ? uploadedFiles
          : uploadedFiles[0];
      }
    });

    const user = await this.userService.findUserById(userId);

    const resume = this.resumeRepository.create(createResumeDto);
    resume.owner = user;
    await this.resumeRepository.save(resume);
    return resume;
  }

  async findAll(): Promise<Resume[]> {
    return this.resumeRepository.find({
      relations: ['education', 'experiences'],
    });
  }

  async findOne(id: number): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: { id },
      relations: ['education', 'experiences'],
      select: ['name', 'createdAt', 'location', 'title'],
    });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
    return resume;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    const resume = await this.findOne(id);
    Object.assign(resume, updateResumeDto);
    return this.resumeRepository.save(resume);
  }

  async remove(id: number): Promise<void> {
    const result = await this.resumeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
  }

  async findResumesByUserId(id: number): Promise<Resume[]> {
    return this.resumeRepository.find({
      where: {
        owner: {
          id,
        },
      },
      relations: ['education', 'experiences'],
    });
  }
}
