import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostsService {
    private prisma = new PrismaClient();

    async create(createPostDto: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                ...createPostDto,
                tags: { set: createPostDto.tags }, // Set tags as an array
            },
        });
    }

    async findAll() {
        return this.prisma.post.findMany({
            orderBy: {
                createdAt: 'desc', // Order by createdAt in descending order
            },
            include: {
                author: {
                    select: {
                        username: true,
                    },
                },
                comments: true,
            }
        });
    }

    async findAllMe(userId: number) {

        return this.prisma.post.findMany({
            where: { authorId: userId },
            orderBy: {
                createdAt: 'desc', // Order by createdAt in descending order
            },
            include: {
                author: {
                    select: {
                        username: true,
                    },
                },
                comments: true,
            }
        });
    }

    async findOne(id: number) {
        return this.prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        username: true,
                    },
                },
                comments: {
                    select: {
                        content: true,
                        updatedAt: true,
                        author: {
                            select: {
                                username: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        return this.prisma.post.update({
            where: { id },
            data: {
                ...updatePostDto,
                tags: { set: updatePostDto.tags }, // Update tags as an array
            },
        });
    }

    async remove(id: number) {
        return this.prisma.post.delete({
            where: { id },
        });
    }
}
