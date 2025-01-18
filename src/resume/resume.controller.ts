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
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthenticationRequest } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: new FileUploadService().getStorage('uploads/resumes'),
    }),
  )
  async create(
    @Body() createResumeDto: CreateResumeDto,
    @Req() req: AuthenticationRequest,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const filesMap = {};
    files.forEach((file) => {
      if (!filesMap[file.fieldname]) filesMap[file.fieldname] = [];
      filesMap[file.fieldname].push(file);
    });

    return this.resumeService.create(createResumeDto, req.user.id, filesMap);
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
