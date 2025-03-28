import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [UserModule, ActivityModule],
})
export class AppModule {}
