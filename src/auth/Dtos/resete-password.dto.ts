import { ApiProperty } from '@nestjs/swagger';

export class ResetePasswordDto {
  @ApiProperty({
    required: true,
    description: 'The new password of the user',
    example: 'password',
  })
  password: string;
}
