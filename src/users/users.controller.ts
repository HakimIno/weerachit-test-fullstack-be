import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUser(@Query('username') username: string): Promise<any> {
        const user = await this.usersService.findUserByUsername(username);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Get User Successful', user };
    }

    @Post('login')
    async loginUser(@Body() body: { username: string }) {
        const { username } = body;

        if (!username) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersService.login(username);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Login successful', user };
    }
}
