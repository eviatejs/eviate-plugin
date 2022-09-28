import type { handler, MiddlewareHandler } from 'eviate';

export interface RouteVal {
  path: string;
  method: string;
  handler: handler;
}

export interface MiddlewareVal {
  position: string;
  handler: MiddlewareHandler;
}

export interface ReturnVal {
  routes: RouteVal[];
  middlewares: MiddlewareVal[];
}
