import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
} from 'class-validator';
import {
  ChildrenType,
  GenderType,
  LanguageProficiency,
  RelationType,
} from 'src/common/types/resume.type';

export class CreateResumeDto {
  @ApiProperty({ description: 'Full name of the applicant' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address of the applicant' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Phone number of the applicant' })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Gender of the applicant',
    enum: GenderType,
  })
  @IsEnum(GenderType)
  gender: GenderType;

  @ApiProperty({ description: 'Date of birth of the applicant' })
  @IsDate()
  birthDate: Date;

  @ApiProperty({
    description: 'Relationship status of the applicant',
    enum: RelationType,
  })
  @IsEnum(RelationType)
  relationShip: RelationType;

  @ApiPropertyOptional({
    description: 'Children details, if applicable',
    enum: ChildrenType,
  })
  @IsOptional()
  @IsEnum(ChildrenType)
  children?: ChildrenType;

  @ApiProperty({ description: 'Height of the applicant in cm' })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Weight of the applicant in kg' })
  @IsNumber()
  weight: number;

  @ApiProperty({ description: 'Location of the applicant' })
  @IsString()
  location: string;

  @ApiPropertyOptional({
    description: 'Profile image of the applicant',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    description: 'Array of additional images',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  @IsOptional()
  @IsArray()
  images?: any[];

  @ApiProperty({ description: 'Job category of the applicant' })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Title or position the applicant is applying for',
  })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Years of experience the applicant has' })
  @IsNumber()
  experience: number;

  @ApiProperty({
    description: 'Skills of the applicant as a comma-separated string',
  })
  @IsString()
  skills: string;

  @ApiProperty({
    description: 'Content or additional information about the applicant',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Does the applicant have a high school diploma?',
  })
  @IsBoolean()
  haveHightSchool: boolean;

  @ApiProperty({ description: 'Highest level of education attained' })
  @IsString()
  educationLevel: string;

  @ApiPropertyOptional({
    description: 'Cover photos for the resume',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  @IsOptional()
  @IsArray()
  coverPhotos?: any[];

  @ApiProperty({
    description: 'English language proficiency level',
    enum: LanguageProficiency,
  })
  @IsEnum(LanguageProficiency)
  englishLevel: LanguageProficiency;

  @ApiProperty({
    description: 'Arabic language proficiency level',
    enum: LanguageProficiency,
  })
  @IsEnum(LanguageProficiency)
  arabicLevel: LanguageProficiency;

  @ApiPropertyOptional({
    description: 'French language proficiency level',
    enum: LanguageProficiency,
  })
  @IsOptional()
  @IsEnum(LanguageProficiency)
  frenchLevel?: LanguageProficiency;

  @ApiPropertyOptional({
    description: 'German language proficiency level',
    enum: LanguageProficiency,
  })
  @IsOptional()
  @IsEnum(LanguageProficiency)
  germanLevel?: LanguageProficiency;

  @ApiPropertyOptional({
    description: 'Spanish language proficiency level',
    enum: LanguageProficiency,
  })
  @IsOptional()
  @IsEnum(LanguageProficiency)
  spanishLevel?: LanguageProficiency;

  @ApiPropertyOptional({
    description: 'Resume file path',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  resumeFile?: any;

  @ApiPropertyOptional({
    description: 'Original resume file path',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  resumeOriginalFile?: any;
}
