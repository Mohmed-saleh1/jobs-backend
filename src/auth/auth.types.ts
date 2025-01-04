import { Request } from 'express';
import { UserResponseDto } from 'src/user/Dtos/user-response.dto';

export interface AuthenticationRequest extends Request {
  user?: UserResponseDto;
}
