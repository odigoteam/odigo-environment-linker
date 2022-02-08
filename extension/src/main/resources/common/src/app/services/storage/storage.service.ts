import {Injectable} from '@angular/core';
import {BrowserService} from "../browser/browser.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _browserService: BrowserService) {
  }

  get(key: string): Promise<void> {
    return new Promise(resolve => {
      this._browserService.storage.get(key, resolve)
    })
  }

  set(item: any): void {
    this._browserService.storage.set(item);
  }
}
