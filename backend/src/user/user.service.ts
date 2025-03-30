import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
      return await prisma.user.create({
        data: { email, name, password: hashedPassword }, // Save the hashed password
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      return { ok: true, message: 'Login successful', user };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
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

  async getUserActivities(userId: number) {
    return await prisma.activity.findMany({
      where: {
        userId: userId,
      },
    });
  }  

}
