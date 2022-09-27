import { Plugin } from '@eviatejs/plugin';

import type { Engine } from 'eviate';

export class CorsPlugin extends Plugin {
  constructor() {
    super({
      title: 'Cors Plugin',
      description: 'A plugin that allows you to use cors',
      version: '1.0.0'
    });
  }

  public get settings() {
    return {};
  }

  public handler(app: Engine): void {}
}
