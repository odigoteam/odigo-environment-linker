import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";
import {EnvironmentsService} from "../../../../services/environments.service";

@Component({
  selector: 'env-view',
  templateUrl: './env-view.component.html',
  styleUrls: ['./env-view.component.css']
})
export class EnvViewComponent implements OnInit {
  supportedVersions: any[] = [];
  userConf: UserConfiguration = new UserConfiguration();

  constructor(private _configurationService: ConfigurationService) {
    this.userConf = this._configurationService.configuration.config;
    this._configurationService.configuration.supportedOccVersions.forEach(version => {
      this.supportedVersions.push({
        version: version,
        checked: this.userConf.filters.versions.includes(version)
      });
    });
  }

  ngOnInit(): void {
  }

  updateVersionFilter(index: number) {
    console.log(`version = ${JSON.stringify(this.supportedVersions[index])}`);
  }

  saveConf() {
    this._configurationService.save();
  }

  clearSearch() {
    this.userConf.search = "";
    this.saveConf();
  }
}
