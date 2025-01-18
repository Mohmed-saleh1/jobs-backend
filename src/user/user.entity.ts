import { Role } from 'src/common/types/user.types';
import { Job } from 'src/job/job.entity';
import { Education } from 'src/resume/entities/education.entity';
import { Experience } from 'src/resume/entities/experience.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  location: string;

  @OneToMany(() => Resume, (res) => res.owner)
  resumes: Resume[];

  @OneToMany(() => Job, (job) => job.owner)
  jobs: Job[];

  @OneToMany(() => Education, (education) => education.owner)
  educations: Education[];

  @OneToMany(() => Experience, (experience) => experience.owner)
  experiences: Experience[];

  @Column({ nullable: false, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  emailVerifyCode: string;

  @Column({ nullable: true })
  emailVerifyExpires: Date;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  passwordResetCode: string;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @Column({ default: false, nullable: true })
  passwordResetVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
