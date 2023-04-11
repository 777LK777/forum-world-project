import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('/api/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getUsers();
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto)
  }
}
