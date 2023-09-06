import { CallHandler, NestInterceptor, UseInterceptors, ExecutionContext } from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToInstance } from 'class-transformer'

type ClassContructor = {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(ctx: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) =>
        plainToInstance(this.dto, data, {
          excludeExtraneousValues: true
        })
      )
    )
  }
}
