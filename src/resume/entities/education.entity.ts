import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from './resume.entity';
import { User } from 'src/user/user.entity';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institution: string;

  @Column()
  certifications: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => User, (user) => user.educations)
  owner: Partial<User>;

  @ManyToOne(() => Resume, (res) => res.education)
  resume: Resume;
}
