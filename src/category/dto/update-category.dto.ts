// src/category/dto/update-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Tech',
    description: 'The name of the category',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'Everything about tech',
    description: 'The description of the category',
    required: false,
  })
  description?: string;
}
