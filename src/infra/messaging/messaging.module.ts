import { SendMessage } from '@/app/use-cases/send-message';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'COLLECTIONS_SERVICE',
        imports: [ConfigModule.forRoot()],
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL],
              queue: process.env.RABBITMQ_USERS_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.registerAsync([
      {
        name: 'COLLECTIONS_SERVICE',
        imports: [ConfigModule.forRoot()],
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL],
              queue: process.env.RABBITMQ_USERS_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
    SendMessage,
  ],
  providers: [SendMessage],
})
export class MessagingModule {}
