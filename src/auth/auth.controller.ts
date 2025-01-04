import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Headers,
  UnauthorizedException,
  // Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './Dtos/signup.dto';
import { LoginDto } from './Dtos/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { VerifyEmailDto } from './Dtos/verify-email.dto';
import { ResendVerifyCode } from './Dtos/resend-verify-code.dto';
import { ResetePasswordDto } from './Dtos/resete-password.dto';
// import { AuthenticationRequest } from './auth.types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    const result = await this.authService.signup(signupDto);
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message });
  }

  // Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    // @Req() req: AuthenticationRequest,
  ) {
    const result = await this.authService.login(loginDto);
    // req.user = result.user;
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  }

  // Verify Email
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() input: VerifyEmailDto, @Res() res: Response) {
    const result = await this.authService.verifyEmail(input.code);
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message });
  }

  // Resend Email Verification
  @Post('resend-verify-email')
  @HttpCode(HttpStatus.OK)
  async resendEmailVerifyCode(
    @Body() input: ResendVerifyCode,
    @Res() res: Response,
  ) {
    const result = await this.authService.reSendEmailVerifyCode(input.email);
    return res.json({ message: result.message });
  }

  // Forgot Password
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() input: ResendVerifyCode, @Res() res: Response) {
    await this.authService.forgotPassword(input.email);
    return res.json({ message: 'Password reset email sent' });
  }

  // Verify Reset Password Code
  @Post('verify-reset-code')
  @HttpCode(HttpStatus.OK)
  async verifyPasswordResetCode(
    @Body() input: VerifyEmailDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.verifyPasswordResetCode(input.code);
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message, token: result.token });
  }

  // Reset Password

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Headers('Authorization') authorization: string,
    @Body() input: ResetePasswordDto,
    @Res() res: Response,
  ) {
    if (!authorization) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const token = authorization.replace('Bearer ', '');
    const result = await this.authService.resetPassword(token, input.password);

    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message, token });
  }
}
