import { RequestHandler, Response } from 'express';
import { json } from 'body-parser';
import RequestWithRawBody from 'common/interfaces/requestWithRawBody.interface';

interface RawBodyMiddlewareOptions {
  paths?: string[];
}

function rawBodyMiddleware({
  paths = [],
}: RawBodyMiddlewareOptions): RequestHandler {
  return json({
    verify: (
      request: RequestWithRawBody,
      _response: Response,
      buffer: Buffer,
    ) => {
      if (paths.includes(request.url) && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawBodyMiddleware;
