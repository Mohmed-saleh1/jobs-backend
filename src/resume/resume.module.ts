import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Resume, Education, Experience, User])],
  controllers: [ResumeController],
  providers: [ResumeService, UserService, JwtService],
})
export class ResumeModule {}
