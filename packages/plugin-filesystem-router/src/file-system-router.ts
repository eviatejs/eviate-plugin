import { readdirSync, lstatSync } from 'fs';
import path from 'path';

import { MiddlewareVal, Plugin, ReturnVal, RouteVal } from '@eviatejs/plugin';

import type { FileSystemMiddlewareInterface } from './interfaces/file-system-router';

export class FileSystemRouter extends Plugin {
  routes: RouteVal[];
  middleware: MiddlewareVal[];
  private options: FileSystemMiddlewareInterface;

  constructor(options: FileSystemMiddlewareInterface) {
    super({
      title: 'File System Router',
      description:
        'A plugin that allows you to use the file system to auto load routes and middlewares',
      version: '1.0.0'
    });
    this.routes = [];
    this.middleware = [];
    this.options = options;
  }

  public get settings() {
    return {};
  }

  public middlewares(): void {
    const middlewarePath: string = path.join(
      process.cwd(),
      this.options.middlewareDir
    );

    readdirSync(middlewarePath).forEach(async (file: string) => {
      const middleware = await import(`${middlewarePath}/${file}`);

      this.middleware.push({
        position: middleware.middleware.position,
        handler: middleware.middleware.run
      });
    });
  }

  private async logFile(file: string, path: string) {
    if (file.endsWith('.js') || file.endsWith('.ts')) {
      const code = await import(`${path}/${file}`);

      if (!code.route) throw new Error('Sunrit implement');

      const regex = /\[(\w+)\]/;
      const result = file.match(regex);

      if (result) file = ':' + result[1];

      const rmPath = path
        .replace(process.cwd(), '')
        .replace(this.options.routerDir, '');
      let routePath: string = '';

      if (file.endsWith('.ts'))
        routePath = rmPath + '/' + file.replace('.ts', '');
      if (file.endsWith('.js'))
        routePath = rmPath + '/' + file.replace('.js', '');

      this.routes.push({
        method: code.route.method,
        path: routePath,
        handler: code.route.run
      });
    }
  }

  private logDirectory(file: string) {
    readdirSync(file).forEach(async (dir: string) => {
      const dirFile = await lstatSync(`${file}/${dir}`);

      if (dirFile.isDirectory()) {
        this.logDirectory(`${file}/${dir}`);
      }

      if (dirFile.isFile()) {
        await this.logFile(dir, file);
      }
    });
  }

  public logRoutes() {
    const routePath: string = path.join(process.cwd(), this.options.routerDir);

    readdirSync(routePath).forEach(async (dir: string) => {
      const file = await lstatSync(`${routePath}/${dir}`);

      if (file.isDirectory()) {
        this.logDirectory(`${routePath}/${dir}`);
      }

      if (file.isFile()) {
        await this.logFile(dir, routePath);
      }
    });
  }

  public handler(): ReturnVal {
    const returnVal: ReturnVal = {
      routes: this.routes,
      middlewares: this.middleware
    };
    return returnVal;
  }
}
