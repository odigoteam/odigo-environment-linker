import { Injectable } from '@angular/core';

declare const getBrowserRuntime: any;
declare const getBrowserStorage: any;
declare const getBrowserTabs: any;

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  readonly _runtime: any;
  readonly _storage: any;
  readonly _tabs: any;

  constructor() {
    this._tabs = getBrowserTabs();
    this._storage = getBrowserStorage();
    this._runtime = getBrowserRuntime();
  }

  get tabs(): any {
    return this._tabs;
  }

  get runtime(): any {
    return this._runtime;
  }

  get storage(): any {
    return this._storage;
  }
}
