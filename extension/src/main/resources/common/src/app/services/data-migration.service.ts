import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {ConfigurationService} from "./configuration.service";
import {CustomLinksService} from "./custom-links.service";

@Injectable({
  providedIn: 'root'
})
export class DataMigrationService {

  constructor(private _storage: StorageService,
              private _configuration: ConfigurationService,
              private _customLinksService: CustomLinksService) { }

  migrateModel(callback: any): void {
    
    callback();
  }
}
