import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ description: 'First name of the contact' })
  @IsString()
  @IsNotEmpty()
  fname: string;

  @ApiProperty({ description: 'Last name of the contact' })
  @IsString()
  @IsNotEmpty()
  lname: string;

  @ApiProperty({ description: 'Email of the contact' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Message from the contact' })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateContactDto {
  @ApiProperty({ description: 'First name of the contact', required: false })
  @IsString()
  fname?: string;

  @ApiProperty({ description: 'Last name of the contact', required: false })
  @IsString()
  lname?: string;

  @ApiProperty({ description: 'Email of the contact', required: false })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Message from the contact', required: false })
  @IsString()
  message?: string;

  @ApiProperty({ description: 'The contact has been seen', required: false })
  seen?: boolean;
}

export class ContactResponseDto {
  @ApiProperty({ description: 'ID of the contact' })
  id: number;

  @ApiProperty({ description: 'First name of the contact' })
  fname: string;

  @ApiProperty({ description: 'Last name of the contact' })
  lname: string;

  @ApiProperty({ description: 'Email of the contact' })
  email: string;

  @ApiProperty({ description: 'Message from the contact' })
  message: string;

  @ApiProperty({ description: 'The date when the contact was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the contact was last updated' })
  updatedAt: Date;
}
