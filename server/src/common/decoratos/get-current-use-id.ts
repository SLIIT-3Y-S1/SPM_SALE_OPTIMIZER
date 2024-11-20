import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserID = createParamDecorator(
  (_data: undefined, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    return request.user.id;
  },
);