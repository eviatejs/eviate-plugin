import type { handler, MiddlewareHandler } from 'eviate';

export interface RouteValue {
  path: string;
  method: string;
  handler: handler;
}

export interface MiddlewareValue {
  position: string;
  handler: MiddlewareHandler;
}

export interface ReturnValue {
  routes: RouteValue[];
  middlewares: MiddlewareValue[];
}
