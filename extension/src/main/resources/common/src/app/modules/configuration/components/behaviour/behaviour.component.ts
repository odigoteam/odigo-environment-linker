import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";

@Component({
  selector: 'app-behaviour',
  templateUrl: './behaviour.component.html',
  styleUrls: ['./behaviour.component.css', "../conf-view/conf-view.component.css"]
})
export class BehaviourComponent {
  userConfiguration: UserConfiguration = new UserConfiguration();

  constructor(private _configurationService: ConfigurationService) {
    this.userConfiguration = this._configurationService.configuration.config;
  }

  saveConfig(): void {
    this._configurationService.saveConfiguration();
  }

  updateCMDBFileType(type: string) {
    this.userConfiguration.userOptions.cmdbFileType = type;
    this.saveConfig();
  }
}
