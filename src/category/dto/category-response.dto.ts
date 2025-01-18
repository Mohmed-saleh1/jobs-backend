// src/category/dto/category-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: 1, description: 'The ID of the category' })
  id: number;

  @ApiProperty({ example: 'Technology', description: 'The name of the category' })
  name: string;

  @ApiProperty({ example: 'All things related to technology', description: 'The description of the category' })
  description: string;

  @ApiProperty({ example: '2025-01-18T14:08:05.000Z', description: 'The creation date of the category' })
  createdAt: Date;

  @ApiProperty({ example: '2025-01-18T14:08:05.000Z', description: 'The last update date of the category' })
  updatedAt: Date;
}