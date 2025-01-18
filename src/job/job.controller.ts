import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto, UpdateJobDto, JobResponseDto } from './dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticationRequest } from 'src/auth/auth.types';

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({
    status: 201,
    description: 'The job has been successfully created.',
    type: JobResponseDto,
  })
  async create(
    @Body() createJobDto: CreateJobDto,
    @Req() req: AuthenticationRequest,
  ): Promise<JobResponseDto> {
    return this.jobService.create(createJobDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({
    status: 200,
    description: 'Return all jobs.',
    type: [JobResponseDto],
  })
  async findAll(): Promise<JobResponseDto[]> {
    return this.jobService.findAll();
  }

  @Get('user/:userID')
  @ApiOperation({ summary: 'Get all jobs for a user' })
  @ApiResponse({
    status: 200,
    description: 'Return all jobs for a user.',
    type: [JobResponseDto],
  })
  async findAllForUser(@Param('userID') id: number): Promise<JobResponseDto[]> {
    return this.jobService.findAllForUser(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the job.',
    type: JobResponseDto,
  })
  async findOne(@Param('id') id: number): Promise<JobResponseDto> {
    return this.jobService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a job by ID' })
  @ApiResponse({
    status: 200,
    description: 'The job has been successfully updated.',
    type: JobResponseDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<JobResponseDto> {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job by ID' })
  @ApiResponse({
    status: 204,
    description: 'The job has been successfully deleted.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.jobService.remove(id);
  }
}
