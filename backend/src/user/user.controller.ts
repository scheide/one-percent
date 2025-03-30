import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<Partial<User>> {
    const user = await this.userService.createUser(email, name, password);
    if (user.name === null) {
      throw new Error('User name cannot be null');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name as string,
    } as Partial<User>;
  }

  @Post('login') // Add 'login' as the route path
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<Partial<User>> {
    const response = await this.userService.login(email, password);
    return {
      ok: response.ok,
      message: response.message,
      user: response.user,
    } as Partial<User>;
  }  

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(Number(id));
  }

  @Get(':id/activities')
  async getUserActivities(@Param('id') id: number) {
    return this.userService.getUserActivities(Number(id));
  }  
}
