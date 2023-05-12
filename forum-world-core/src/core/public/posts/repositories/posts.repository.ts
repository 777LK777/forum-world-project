import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PostNameDto } from "../../dto/post-name-dto";

@Injectable()
export class PostsRepository {
    
    constructor(private readonly prismaService: PrismaService) { }

    async getSuperPosts(countryPathFragment: string): Promise<PostNameDto[]> {
        const res = await this.prismaService.post.findMany({
            select: {
                postId: true,
                name: true
            },
            where: {
                AND: [
                    {
                        country: {
                            pathFragment: {
                                equals: countryPathFragment
                            }
                        }
                    },
                    {
                        themeId: {
                            equals: null
                        }
                    }
                ]
            }
        })

        return res.map(p => { return {id: p.postId, name: p.name}})
    }
}