import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dtos/create-resume.dto';
import { UpdateResumeDto } from './dtos/update-resume.dto';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from 'src/user/user.entity';
import { multerOptions } from 'src/common/config/multer.config';
@ApiTags('Resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'resumeFile', maxCount: 1 },
        { name: 'resumeOriginalFile', maxCount: 1 },
        { name: 'coverPhotos', maxCount: 10 },
        { name: 'images', maxCount: 10 },
      ],
      multerOptions,
    ),
  )
  @ApiBody({
    description: 'Create a new resume',
    type: CreateResumeDto,
  })
  async create(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      resumeFile?: Express.Multer.File[];
      resumeOriginalFile?: Express.Multer.File[];
      coverPhotos?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Body() createResumeDto: CreateResumeDto,
    @Req() req: Request & { user: User },
  ) {
    // Extract user information from the request

    const userId = req.user.id;
    const userName = req.user.name;
    // Call the service to create the resume
    return this.resumeService.create(createResumeDto, userId, userName, files);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of resumes.' })
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the resume with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Resume not found.' })
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The resume has been updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resume not found.' })
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(+id, updateResumeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The resume has been deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resume not found.' })
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}
