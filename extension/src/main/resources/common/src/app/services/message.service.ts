import { Injectable } from '@angular/core';

export enum MessageType {
  INFO,
  ERROR
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly _dataMap: any;

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
