import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
    private prisma = new PrismaClient();

    async findUserByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }

    async createUser(username: string,) {
        return this.prisma.user.create({
            data: {
                username,
            },
        });
    }

    async login(username: string) {
        let user = await this.findUserByUsername(username);


        if (!user) {
            user = await this.createUser(username);
        }

        return user;
    }

}
