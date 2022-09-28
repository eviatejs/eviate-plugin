import { EventEmitter } from 'sweet-event-emitter';

import { defaultAppMetadataValue } from './schema/AppMetadata';
import { PluginEvents } from './interfaces/plugin-events';

import type { AppMetadata } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';
import type { RouteValue, MiddlewareValue, ReturnValue } from './interfaces';

type PluginEventsKey = keyof typeof PluginEvents;
type PluginEventsValue = typeof PluginEvents[PluginEventsKey];

export abstract class Plugin {
  public readonly event: EventEmitter;

  private _metadata: AppMetadata;

  abstract routes: RouteValue[];
  abstract middleware: MiddlewareValue[];

  constructor(metadata: AppMetadata) {
    this._metadata = { ...defaultAppMetadataValue, ...metadata };

    this.event = new EventEmitter();
  }

  public get metadata(): AppMetadata {
    return this._metadata;
  }

  public on(event: PluginEventsValue, callback: (plugin: this) => void): void {
    this.event.on(event, callback);
  }

  // Region: Abstract functions
  abstract get settings(): PluginSettings;

  public abstract handler(): ReturnValue;
}
