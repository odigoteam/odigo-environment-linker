import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataBusService {
  readonly _dataMap: any;

  confBtnIcon = new Subject<string>();

  constructor() {
    this._dataMap = new Map();
  }

  put(key: string, data: any) {
    this._dataMap.set(key, data);
  }

  pop(key: string): any {
    let value = this._dataMap.get(key);
    this._dataMap.delete(key);
    return value;
  }
}
