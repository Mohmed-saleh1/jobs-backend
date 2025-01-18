import { JobType, LocationType } from 'src/common/types/job.type';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: LocationType.ONSITE })
  locationType: LocationType;

  @Column({ default: JobType.FULLTIME })
  jobType: JobType;

  @Column()
  tags: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  jobLink: string;

  @Column({ nullable: true })
  closeDate: Date | null;

  @ManyToOne(() => User, (user) => user.jobs)
  owner: User;
}
