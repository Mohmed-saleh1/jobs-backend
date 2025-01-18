import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto, UpdateJobDto, JobResponseDto } from './dtos';
import { User } from '../user/user.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createJobDto: CreateJobDto,
    ownerId: number,
  ): Promise<JobResponseDto> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new NotFoundException(`User with ID ${ownerId} not found`);
    }
    const job = this.jobRepository.create({ ...createJobDto, owner });
    await this.jobRepository.save(job);
    return this.mapToJobResponseDto(job);
  }

  async findAll(): Promise<JobResponseDto[]> {
    const jobs = await this.jobRepository.find({ relations: ['owner'] });
    return jobs.map(this.mapToJobResponseDto);
  }

  async findOne(id: number): Promise<JobResponseDto> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return this.mapToJobResponseDto(job);
  }

  async update(
    id: number,
    updateJobDto: UpdateJobDto,
  ): Promise<JobResponseDto> {
    const job = await this.jobRepository.preload({ id, ...updateJobDto });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    await this.jobRepository.save(job);
    return this.mapToJobResponseDto(job);
  }

  async remove(id: number): Promise<void> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    await this.jobRepository.remove(job);
  }

  private mapToJobResponseDto(job: Job): JobResponseDto {
    const {
      id,
      title,
      location,
      locationType,
      jobType,
      tags,
      description,
      category,
      jobLink,
      closeDate,
      owner,
    } = job;
    return {
      id,
      title,
      location,
      locationType,
      jobType,
      tags,
      description,
      category,
      jobLink,
      closeDate,
      ownerId: owner.id,
    };
  }

  async findAllForUser(id: number): Promise<JobResponseDto[]> {
    const jobs = await this.jobRepository.find({ where: { owner: { id } } });
    return jobs.map(this.mapToJobResponseDto);
  }
}
