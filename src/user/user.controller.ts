import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { UserResponseDto } from './Dtos/user-response.dto';
import { CreateUserResponseDto } from './Dtos/create-user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findAllUsers();
    const foundUser = user.find((u) => u.id === id);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAllUsers();
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
