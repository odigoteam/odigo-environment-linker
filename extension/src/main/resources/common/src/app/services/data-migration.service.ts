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
    let toKeep = ["customLinks", "extensionConfiguration", "userOptions", "filtersOptions"];
    let toMigrate = ["odigoEnvLinker"];
    this._storage.get(null).then((data: any) => {
      for (const [key, value] of Object.entries(data)) {
        if(toKeep.indexOf(key) >= 0) {
          // do nothing
        } else if(toMigrate.indexOf(key) >= 0 && key === 'odigoEnvLinker') {
          this._configuration.configuration.userConfiguration.userOptions = { ...this._configuration.configuration.userConfiguration.userOptions, ...data.odigoEnvLinker.config.options };
          this._configuration.configuration.userConfiguration.filterOptions = { ...this._configuration.configuration.userConfiguration.filterOptions, ...data.odigoEnvLinker.config.filters };
          this._configuration.configuration.userConfiguration.extensionConfiguration.latestExtensionVersionUsed = data.odigoEnvLinker.config.latestExtensionVersionUsed;
          this._configuration.configuration.userConfiguration.extensionConfiguration.search = data.odigoEnvLinker.config.search;
          this._configuration.configuration.userConfiguration.extensionConfiguration.confURL = data.odigoEnvLinker.config.confURL;

          this._storage.set({extensionConfiguration : this._configuration.configuration.userConfiguration.extensionConfiguration});
          this._storage.set({userOptions : this._configuration.configuration.userConfiguration.userOptions});
          this._storage.set({filtersOptions : this._configuration.configuration.userConfiguration.filterOptions});
          this._storage.remove(key, () => {});
        } else {
          this._storage.remove(key, () => {});
        }
      }
      callback();
    });
  }
}
