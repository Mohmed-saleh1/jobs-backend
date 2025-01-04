import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ContactResponseDto,
  CreateContactDto,
  UpdateContactDto,
} from './Dtos/contact.dtos';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({
    status: 201,
    description: 'The contact has been successfully created.',
    type: ContactResponseDto,
  })
  async create(@Body() createContactDto: CreateContactDto) {
    const contact = await this.contactService.create(createContactDto);
    return contact;
  }

  @Get('new')
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of contacts.',
    type: [ContactResponseDto],
  })
  async findAllNew() {
    return this.contactService.findAllNew();
  }

  @Get('old')
  @ApiOperation({ summary: 'Get all old contacts' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of contacts.',
    type: [ContactResponseDto],
  })
  async findAllOld() {
    return this.contactService.findAllOld();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact by ID' })
  @ApiResponse({
    status: 200,
    description: 'The contact has been successfully retrieved.',
    type: ContactResponseDto,
  })
  async findOne(@Param('id') id: number) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contact by ID' })
  @ApiResponse({
    status: 200,
    description: 'The contact has been successfully updated.',
    type: ContactResponseDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact by ID' })
  @ApiResponse({
    status: 204,
    description: 'The contact has been successfully deleted.',
  })
  async remove(@Param('id') id: number) {
    return this.contactService.remove(id);
  }
}
