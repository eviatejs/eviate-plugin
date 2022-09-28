import { EventEmitter } from 'sweet-event-emitter';

import { defaultAppMetadataValue } from './schema/AppMetadata';

import type { AppMetadata } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';
import type { RouteValue, MiddlewareValue, ReturnValue } from './interfaces';
export abstract class Plugin {
  public readonly event: EventEmitter;
  abstract routes: RouteValue[];
  abstract middleware: MiddlewareValue[];
  private _metadata: AppMetadata;

  constructor(metadata: AppMetadata) {
    this._metadata = { ...defaultAppMetadataValue, ...metadata };
    this.event = new EventEmitter();
  }

  public get metadata(): AppMetadata {
    return this._metadata;
  }

  public abstract handler(): ReturnValue;

  abstract get settings(): PluginSettings;
}
