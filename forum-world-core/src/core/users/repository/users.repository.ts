import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../dto/create-user-dto";
import { User } from "@prisma/client";

@Injectable()
export class UsersRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async getUsers() {
        return await this.prismaService.user.findMany({
            select: {
                id: true,
                name:true,
                email: true
            }
        })
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                ...dto
            }
        })

        return user;
    }
}