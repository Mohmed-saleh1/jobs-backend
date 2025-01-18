import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from './resume.entity';
import { User } from 'src/user/user.entity';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  employer: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  notes: string;

  @ManyToOne(() => User, (user) => user.experiences)
  owner: Partial<User>;

  @ManyToOne(() => Resume, (res) => res.experiences)
  resume: Resume;
}
