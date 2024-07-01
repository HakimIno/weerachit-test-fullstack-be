import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
    private prisma = new PrismaClient();

    async create(createCommentDto: CreateCommentDto) {
        return this.prisma.comment.create({
            data: createCommentDto,
        });
    }
}
