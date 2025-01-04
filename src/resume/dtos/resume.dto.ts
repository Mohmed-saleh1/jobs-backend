import { ApiProperty } from '@nestjs/swagger';
import {
  ChildrenType,
  LanguageProficiency,
} from 'src/common/types/resume.type';
import { Education } from '../entities/education.entity';
import { Experience } from '../entities/experience.entity';

export class ResumeDto {
  @ApiProperty({ description: 'Unique identifier of the resume' })
  id: number;

  @ApiProperty({ description: 'Full name of the applicant' })
  name: string;

  @ApiProperty({ description: 'Email address of the applicant' })
  email: string;

  @ApiProperty({ description: 'Phone number of the applicant' })
  phone: string;

  @ApiProperty({
    description: 'Gender of the applicant',
    enum: ['male', 'female'],
  })
  gender: 'male' | 'female';

  @ApiProperty({ description: 'Date of birth of the applicant' })
  birthDate: Date;

  @ApiProperty({ description: 'Relationship status of the applicant' })
  relationShip: string;

  @ApiProperty({
    description: 'Children details, if applicable',
    required: false,
  })
  children?: ChildrenType;

  @ApiProperty({ description: 'Height of the applicant in cm' })
  height: number;

  @ApiProperty({ description: 'Weight of the applicant in kg' })
  weight: number;

  @ApiProperty({ description: 'Location of the applicant' })
  location: string;

  @ApiProperty({
    description: 'Profile image of the applicant',
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: 'Additional images of the applicant',
    type: [String],
  })
  images: string[];

  @ApiProperty({ description: 'Job category of the applicant' })
  category: string;

  @ApiProperty({
    description: 'Title or position the applicant is applying for',
  })
  title: string;

  @ApiProperty({ description: 'Years of experience the applicant has' })
  experience: number;

  @ApiProperty({ description: 'Skills of the applicant' })
  skills: string;

  @ApiProperty({
    description: 'Additional content or information about the applicant',
  })
  content: string;

  @ApiProperty({
    description: 'Does the applicant have a high school diploma?',
  })
  haveHightSchool: boolean;

  @ApiProperty({ description: 'Highest level of education attained' })
  educationLevel: string;

  @ApiProperty({ description: 'Cover photos for the resume', type: [String] })
  coverPhotos: string[];

  @ApiProperty({
    description: 'English language proficiency level',
    enum: LanguageProficiency,
  })
  englishLevel: LanguageProficiency;

  @ApiProperty({
    description: 'Arabic language proficiency level',
    enum: LanguageProficiency,
  })
  arabicLevel: LanguageProficiency;

  @ApiProperty({
    description: 'French language proficiency level',
    enum: LanguageProficiency,
    required: false,
  })
  frenchLevel?: LanguageProficiency;

  @ApiProperty({
    description: 'German language proficiency level',
    enum: LanguageProficiency,
    required: false,
  })
  germanLevel?: LanguageProficiency;

  @ApiProperty({
    description: 'Spanish language proficiency level',
    enum: LanguageProficiency,
    required: false,
  })
  spanishLevel?: LanguageProficiency;

  @ApiProperty({ description: 'Resume file path', required: false })
  resumeFile?: string;

  @ApiProperty({ description: 'Original resume file path', required: false })
  resumeOriginalFile?: string;

  @ApiProperty({
    description: 'Education details associated with the resume',
    type: [Education],
  })
  education?: Education[];

  @ApiProperty({
    description: 'Experience details associated with the resume',
    type: [Experience],
  })
  experiences?: Experience[];
}
