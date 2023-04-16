import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./repository/users.repository";
import { CreateUserDto } from "./dto/create-user-dto";

@Injectable()
export class UsersService {

    constructor(private readonly repo: UsersRepository) { }

    async getUsers() {
        return await this.repo.getUsers()
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.repo.createUser(dto)
        return user;
    }
}