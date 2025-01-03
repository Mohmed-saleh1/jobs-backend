import { Controller, Get } from '@nestjs/common';
import { validateHeaderName } from 'node:http';
validateHeaderName;
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return `Hello from the API!`;
  }
}
