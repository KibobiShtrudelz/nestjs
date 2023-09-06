import { CallHandler, NestInterceptor, UseInterceptors, ExecutionContext } from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

export class SerializeInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    console.log('I am running before the request', ctx)

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before a response is sent out
        console.log('I am running before the response is sent out', data)

        return data
      })
    )
  }
}
