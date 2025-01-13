import { forwardRef, Module } from '@nestjs/common';
import { MongoModule } from './mongo.module';
import { DatabaseModule } from './database.module';
import { QueueModule } from './queue.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongoModule, DatabaseModule, QueueModule, HttpModule],
  exports: [MongoModule, DatabaseModule, QueueModule, HttpModule],
  providers: [],
})
export class CommonModule {}
