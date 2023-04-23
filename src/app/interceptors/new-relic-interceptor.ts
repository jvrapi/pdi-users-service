import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import newRelic from 'newrelic';

export class NewRelicInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    newRelic.setTransactionName(context.getHandler().name);
    return next.handle();
  }
}
