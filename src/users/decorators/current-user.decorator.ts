import { ExecutionContext, createParamDecorator } from '@nestjs/common'

// За да ползваме този деекоратор първо трябва да използваме CurrentUserInterceptor-а,
// за да сме сигурни, че сме прикачили "currentUser" prop-а към
// request обекта
export const CurrentUser = createParamDecorator((_data: never, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()

  return request.currentUser
})
