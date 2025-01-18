import { ApiProperty } from '@nestjs/swagger';
import { JobType, LocationType } from 'src/common/types/job.type';

export class CreateJobDto {
  @ApiProperty({
    example: 'Software Engineer',
    description: 'The title of the job',
  })
  title: string;

  @ApiProperty({
    example: 'New York',
    description: 'The location of the job',
    required: false,
  })
  location?: string;

  @ApiProperty({
    example: LocationType.ONSITE,
    description: 'The location type of the job',
    default: LocationType.ONSITE,
  })
  locationType?: LocationType;

  @ApiProperty({
    example: JobType.FULLTIME,
    description: 'The type of the job',
    default: JobType.FULLTIME,
  })
  jobType?: JobType;

  @ApiProperty({
    example: 'Node.js, TypeScript',
    description: 'The tags for the job',
  })
  tags: string;

  @ApiProperty({
    example: 'Develop and maintain web applications',
    description: 'The description of the job',
  })
  description: string;

  @ApiProperty({
    example: 'Software Development',
    description: 'The category of the job',
  })
  category: string;

  @ApiProperty({
    example: 'https://example.com/job',
    description: 'The link to the job',
    required: false,
  })
  jobLink?: string;

  @ApiProperty({
    example: '2025-02-18T14:08:05.000Z',
    description: 'The close date of the job',
    required: false,
  })
  closeDate?: Date;
}
