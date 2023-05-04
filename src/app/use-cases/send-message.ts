import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

interface Message<T> {
  pattern: string;
  message: T;
}

@Injectable()
export class SendMessage {
  constructor(
    @Inject('CollectionsService')
    private collectionsService: ClientProxy,
  ) {}

  async execute<T>({ pattern, message }: Message<T>) {
    await this.collectionsService.connect();

    this.collectionsService.emit(pattern, message);
  }
}
