import {Injectable} from '@angular/core';
import {BrowserService} from "./browser.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _browserService: BrowserService) {
  }

  get(key: string | null): Promise<void> {
    return new Promise(resolve => {
      this._browserService.storage.get(key, resolve)
    })
  }

  set(item: any): void {
    this._browserService.storage.set(item);
  }

  clear(callback: any): void {
    this._browserService.storage.clear(callback);
  }

  remove(key: string, callback: any) {
    this._browserService.storage.remove(key, callback);
  }
}
