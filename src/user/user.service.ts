import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseDto } from './Dtos/user-response.dto';
import { CreateUserResponseDto } from './Dtos/create-user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  transformUserResponse(user: User | null) {
    if (!user) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;
    return userData;
  }

  transformUsersResponse(users: User[]): UserResponseDto[] {
    return users.map((user) => this.transformUserResponse(user));
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(user: CreateUserDto): Promise<CreateUserResponseDto> {
    const hashedPassword = await this.hashPassword(user.password);
    const newUser = this.userRepo.create({
      ...user,
      password: hashedPassword,
    });
    const savedUser = await this.userRepo.save(newUser);
    return this.transformUserResponse(savedUser);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    return this.transformUserResponse(user);
  }

  async findUserByEmailForAuth(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepo.find();
    return this.transformUsersResponse(users);
  }

  async updateUser(
    id: number,
    updateData: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password);
    }

    const updatedUser = Object.assign(user, updateData);
    const savedUser = await this.userRepo.save(updatedUser);
    return this.transformUserResponse(savedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async findUserById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    return this.transformUserResponse(user);
  }
}
