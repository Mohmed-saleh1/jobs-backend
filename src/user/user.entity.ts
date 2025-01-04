import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
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

  @Column({ default: 0 })
  noOfServices: number;

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
