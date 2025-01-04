import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [DatabaseModule, AuthModule, ContactModule, ResumeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
