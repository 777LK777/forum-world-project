import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/create-user-dto"
import { CountryDto as Country } from '../admin/countries/dto/country-dto';

@Controller('api/users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService) {}
    @Get()
    async getAll(): Promise<Country[]> {
        return await this.usersService.getUsers();
    }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<Country> {
        return await this.usersService.createUser(dto);
    }
}
