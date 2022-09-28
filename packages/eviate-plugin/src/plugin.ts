import { EventEmitter } from 'sweet-event-emitter';

import { defaultAppMetadataValue } from './schema/AppMetadata';

import type { Engine } from 'eviate';
import type { AppMetadata } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';
import type { RouteVal, MiddlewareVal, ReturnVal } from './interfaces';
export abstract class Plugin {
  public readonly event: EventEmitter;
  private routes: RouteVal[];
  private middleware: MiddlewareVal[];
  private _metadata: AppMetadata;

  constructor(metadata: AppMetadata) {
    this._metadata = { ...defaultAppMetadataValue, ...metadata };
    this.routes = [];
    this.middleware = [];
    this.event = new EventEmitter();
  }

  public get metadata(): AppMetadata {
    return this._metadata;
  }

  public abstract handler(): ReturnVal;

  abstract get settings(): PluginSettings;
}
