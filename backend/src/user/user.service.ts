import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

try {
  prisma = new PrismaClient();
} catch (error) {
  throw new Error(`Failed to initialize PrismaClient: ${error.message}`);
}

@Injectable()
export class UserService {
  async createUser(email: string, name: string, password: string) {
    try {
      return await prisma.user.create({
        data: { email, name, password },
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
}
