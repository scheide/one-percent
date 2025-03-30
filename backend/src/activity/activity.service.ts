import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ActivityService {
  async createActivity(
    userId: number,
    title: string,
    description: string,
    date: Date,
  ) {
    return prisma.activity.create({
      data: { userId, title, description, date },
    });
  }

  async getActivityById(id: number) {
    return await prisma.activity.findUnique({
      where: { id },
    });
  }

  async updateActivity(
    id: number,
    title: string,
    description: string,
    date: Date,
  ) {
    return await prisma.activity.update({
      where: { id },
      data: { title, description, date },
    });
  }
}
