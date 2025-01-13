import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { queueNames } from 'src/constants/queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: queueNames.email,
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
