import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const transactionName =
      context.getArgs().pop().operation.name?.value ?? context.getHandler();
    newrelic.setTransactionName(transactionName);
    return next.handle();
  }
}
