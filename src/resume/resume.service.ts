import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeDto } from './dtos/create-resume.dto';
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
    userName: string,
    files: {
      image?: Express.Multer.File[];
      resumeFile?: Express.Multer.File[];
      resumeOriginalFile?: Express.Multer.File[];
      coverPhotos?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
  ): Promise<Resume> {
    // Create the user folder if it doesn't exist
    const userFolderPath = this.fileUploadService.createUserFolder(
      userId,
      userName,
    );

    // Generate a unique folder name for the application
    const applicationFolderName =
      this.fileUploadService.generateApplicationFolderName();
    const applicationFolderPath =
      this.fileUploadService.createApplicationFolder(
        userFolderPath,
        applicationFolderName,
      );

    // Define the uploadable fields
    const uploadableFields = [
      { field: 'image', isArray: false },
      { field: 'resumeFile', isArray: false },
      { field: 'resumeOriginalFile', isArray: false },
      { field: 'coverPhotos', isArray: true },
      { field: 'images', isArray: true },
    ];

    // Process each uploadable field
    uploadableFields.forEach(({ field, isArray }) => {
      if (files[field]) {
        const filePaths = files[field].map((file) => {
          // Validate file type and size
          this.fileUploadService.validateFileType(file, [
            'image/jpeg',
            'image/png',
            'application/pdf',
          ]);
          this.fileUploadService.validateFileSize(file, 5 * 1024 * 1024); // 5 MB

          // Move the file to the application folder
          const filePath = this.fileUploadService.moveFileToFolder(
            file,
            applicationFolderPath,
          );

          return filePath;
        });

        // Update the DTO with the file paths
        createResumeDto[field] = isArray ? filePaths : filePaths[0];
      }
    });

    // Create and save the resume
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
