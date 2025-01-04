import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class forgotPasswordDto {
  @ApiProperty({
    description: 'Email of the user',
    example: '',
  })
  @IsEmail()
  email: string;
}
