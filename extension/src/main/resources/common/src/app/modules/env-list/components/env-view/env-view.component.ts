import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";
import {EnvironmentsService} from "../../../../services/environments.service";
import {DataBusService} from "../../../../services/data-bus.service";

@Component({
  selector: 'env-view',
  templateUrl: './env-view.component.html',
  styleUrls: ['./env-view.component.css']
})
export class EnvViewComponent implements OnInit {
  supportedVersions: any[] = [];
  userConf: UserConfiguration = new UserConfiguration();

  constructor(private _configurationService: ConfigurationService,
              private _environmentsService: EnvironmentsService,
              private _dataBusService: DataBusService) {
    this.userConf = this._configurationService.configuration.config;
    this._dataBusService.confBtnIcon.next("toggles");
    this._configurationService.configuration.supportedOccVersions.forEach(version => {
      this.supportedVersions.push({
        version: version,
        checked: this.userConf.filters.versions.includes(version)
      });
    });
  }

  ngOnInit(): void {
    this._environmentsService.runSearch();
  }

  updateVersionFilter(index: number) {
    let version = this.supportedVersions[index];
    if(version.version === "all" && version.checked) {
      this._configurationService.configuration.config.filters.versions = [...this._configurationService.configuration.supportedOccVersions];
    } else {
      // Remove all option
      let index = this._configurationService.configuration.config.filters.versions.indexOf("all");
      if (index > -1) {
        this._configurationService.configuration.config.filters.versions.splice(index, 1);
      }
      if(version.checked) {
        if(!this._configurationService.configuration.config.filters.versions.includes(version.version)) {
          this._configurationService.configuration.config.filters.versions.push(version.version);
        }
        if(this._configurationService.configuration.config.filters.versions.length === (this._configurationService.configuration.supportedOccVersions.length -1)) {
          this._configurationService.configuration.config.filters.versions.push("all");
        }
      } else {
        index = this._configurationService.configuration.config.filters.versions.indexOf(version.version);
        if (index > -1) {
          this._configurationService.configuration.config.filters.versions.splice(index, 1);
        }
      }
    }

    this.updateFilters();
    this._configurationService.save();
    this._environmentsService.runSearch();
  }

  private updateFilters() {
    this.supportedVersions.forEach(item => {
      item.checked = this.userConf.filters.versions.includes(item.version);
    });
  }

  updateResults() {
    this._environmentsService.runSearch();
    this._configurationService.save();
  }

  clearSearch() {
    this.userConf.search = "";
    this.updateResults();
  }
}
