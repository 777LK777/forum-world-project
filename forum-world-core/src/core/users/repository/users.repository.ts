import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../dto/create-user-dto";
import { User as DbUser } from "@prisma/client";

@Injectable()
export class UsersRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async getUsers() {
        return await this.prismaService.user.findMany({
            select: {
                userId: true,
                name:true,
                email: true
            }
        })
    }

    async createUser(dto: CreateUserDto): Promise<DbUser> {
        return await this.prismaService.user.create({
            data: {
                ...dto
            }
        })
    }
}