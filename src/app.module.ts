import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ResumeModule } from './resume/resume.module';
import { staticConfig } from './common/config/static.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JobModule } from './job/job.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(staticConfig),
    DatabaseModule,
    AuthModule,
    ContactModule,
    ResumeModule,
    JobModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
