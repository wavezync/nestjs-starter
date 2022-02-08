import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequest } from 'common/graphql/context';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    return request.user;
  },
);
