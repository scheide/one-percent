import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
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

  @Get(':id')
  async getActivityById(@Param('id') id: number) {
    return this.activityService.getActivityById(Number(id));
  }

  @Put(':id')
  async updateActivity(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('date') date: string,
  ): Promise<Activity> {
    return this.activityService.updateActivity(
      Number(id),
      title,
      description,
      new Date(date),
    );
  }
}
