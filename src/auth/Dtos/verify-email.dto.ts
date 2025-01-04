import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'the verfiy email code',
    example: '1234',
  })
  code: string;
}
