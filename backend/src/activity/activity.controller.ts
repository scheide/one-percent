import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { Activity } from '@prisma/client';
import { ActivityService } from './activity.service';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async createActivity(
    @Body('userId') userId: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('date') date: string,
  ): Promise<Activity> {
    return this.activityService.createActivity(
      userId,
      title,
      description,
      new Date(date),
    );
  }

  @Get()
  async getAllActivities() {
    return this.activityService.getAllActivities();
  }

  @Get(':userId')
  async getActivitiesByUserId(
    @Param('userId') userId: number,
  ): Promise<Activity[]> {
    return this.activityService.getActivitiesByUserId(userId);
  }
}
