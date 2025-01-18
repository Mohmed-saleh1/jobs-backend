import { ApiProperty } from '@nestjs/swagger';
import { JobType, LocationType } from 'src/common/types/job.type';

export class UpdateJobDto {
  @ApiProperty({
    example: 'Senior Software Engineer',
    description: 'The title of the job',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'Remote',
    description: 'The location of the job',
    required: false,
  })
  location?: string;

  @ApiProperty({
    example: LocationType.REMOTE,
    description: 'The location type of the job',
    required: false,
  })
  locationType?: LocationType;

  @ApiProperty({
    example: JobType.PARTTIME,
    description: 'The type of the job',
    required: false,
  })
  jobType?: JobType;

  @ApiProperty({
    example: 'Node.js, TypeScript, AWS',
    description: 'The tags for the job',
    required: false,
  })
  tags?: string;

  @ApiProperty({
    example: 'Develop and maintain web applications',
    description: 'The description of the job',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'Software Development',
    description: 'The category of the job',
    required: false,
  })
  category?: string;

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
