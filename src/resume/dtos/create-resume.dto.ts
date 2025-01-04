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
  LanguageProficiency,
} from 'src/common/types/resume.type';
import { Experience } from '../entities/experience.entity';
import { Education } from '../entities/education.entity';
import { RelationType } from 'typeorm/metadata/types/RelationTypes';

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
    enum: ['male', 'female'],
  })
  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  @ApiProperty({ description: 'Date of birth of the applicant' })
  @IsDate()
  birthDate: Date;

  @ApiProperty({ description: 'Relationship status of the applicant' })
  @IsString()
  relationShip: RelationType;

  @ApiPropertyOptional({ description: 'Children details, if applicable' })
  @IsOptional()
  @IsString()
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

  @ApiPropertyOptional({ description: 'Profile image of the applicant' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'Array of additional images', type: [String] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

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

  @ApiProperty({ description: 'Cover photos for the resume', type: [String] })
  @IsArray()
  @IsString({ each: true })
  coverPhotos: string[];

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

  @ApiPropertyOptional({ description: 'Resume file path' })
  @IsOptional()
  @IsString()
  resumeFile?: string;

  @ApiPropertyOptional({ description: 'Original resume file path' })
  @IsOptional()
  @IsString()
  resumeOriginalFile?: string;

  @ApiPropertyOptional({
    description: 'Education IDs linked to the resume',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education?: Education[];

  @ApiPropertyOptional({
    description: 'Experience IDs linked to the resume',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experiences?: Experience[];
}
