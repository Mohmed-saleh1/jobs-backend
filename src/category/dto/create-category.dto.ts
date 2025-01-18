// src/category/dto/create-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Technology',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: 'All things related to technology',
    description: 'The description of the category',
    required: false,
  })
  description?: string;
}
