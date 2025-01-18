import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Education } from './education.entity';
import {
  ChildrenType,
  LanguageProficiency,
  RelationType,
  GenderType,
} from 'src/common/types/resume.type';
import { Experience } from './experience.entity';
import { User } from 'src/user/user.entity';

@Entity('resumies')
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  gender: GenderType;

  @Column()
  birthDate: Date;

  @Column()
  relationShip: RelationType;

  @Column()
  children: ChildrenType;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  location: string;

  @Column()
  image?: string;

  // @Column()
  images?: string[];

  @Column()
  category: string;

  @Column()
  title: string;

  @Column()
  experience: number;

  @Column()
  skills: string;

  @Column()
  content: string;

  @Column()
  haveHightSchool: boolean;

  @Column()
  educationLevel: string;

  @OneToMany(() => Education, (edu) => edu.resume)
  education: Education[];

  @Column()
  englishLevel: LanguageProficiency;

  @Column()
  arabicLevel: LanguageProficiency;

  @Column()
  frenchLevel: LanguageProficiency;

  @Column()
  germanLevel: LanguageProficiency;

  @Column()
  spanishLevel: LanguageProficiency;

  @OneToMany(() => Experience, (exp) => exp.resume)
  experiences?: Experience[];

  @Column()
  resumeFile?: string;

  @Column()
  resumeOriginalFile?: string;

  // @Column()
  coverPhotos?: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.resumes)
  owner: Partial<User>;
}
