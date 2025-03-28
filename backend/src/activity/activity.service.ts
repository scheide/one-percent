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

  async getAllActivities() {
    return prisma.activity.findMany();
  }

  async getActivitiesByUserId(userId: number) {
    return prisma.activity.findMany({
      where: { userId },
    });
  }
}
