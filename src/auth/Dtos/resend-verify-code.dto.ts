import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendVerifyCode {
  @ApiProperty({
    description: 'The email address of the user',
    example: '',
  })
  @IsEmail()
  email: string;
}
