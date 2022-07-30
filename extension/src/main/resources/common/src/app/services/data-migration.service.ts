import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {ConfigurationService} from "./configuration.service";
import {CustomLinksService} from "./custom-links.service";
import packageJson from "../../../package.json";

@Injectable({
  providedIn: 'root'
})
export class DataMigrationService {

  constructor(private _storage: StorageService,
              private _configuration: ConfigurationService,
              private _customLinksService: CustomLinksService) { }

  migrateModel(callback: any): void {
    this._storage.get(null).then((data: any) => {
      if (data.userOptions.aws.role !== undefined) {
        data.userOptions.aws.roles = [data.userOptions.aws.role];
        delete data.userOptions.aws.role;
        this._storage.set({userOptions : data.userOptions});
      }

      callback();
    });
  }
}
