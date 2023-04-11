import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./repository/users.repository";
import { CreateUserDto } from "./dto/create-user-dto";

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) { }

    async getUsers() {
        return await this.usersRepository.getUsers()
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.createUser(dto)
        return user;
    }
}