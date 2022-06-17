import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";
import {EnvironmentsService} from "../../../../services/environments.service";
import {DataBusService} from "../../../../services/data-bus.service";
import {EasterEggsService} from "../../../../services/easter-eggs.service";

@Component({
  selector: 'env-view',
  templateUrl: './env-view.component.html',
  styleUrls: ['./env-view.component.css']
})
export class EnvViewComponent implements OnInit, AfterViewInit {
  supportedVersions: any[] = [];
  userConf: UserConfiguration = new UserConfiguration();
  @ViewChild('searchField') searchField: ElementRef | undefined;

  constructor(private _configurationService: ConfigurationService,
              private _environmentsService: EnvironmentsService,
              private _dataBusService: DataBusService,
              private _easterEggService: EasterEggsService) {
    this.userConf = this._configurationService.configuration.userConfiguration;
    this._dataBusService.confBtnIcon.next("configuration");
    this._configurationService.configuration.supportedOccVersions.forEach(version => {
      this.supportedVersions.push({
        version: version,
        checked: this.userConf.filterOptions.versions.includes(version)
      });
    });
  }

  ngAfterViewInit(): void {
    this.searchField?.nativeElement.focus();
  }

  ngOnInit(): void {
    this._environmentsService.runSearch();
  }

  updateVersionFilter(index: number) {
    let version = this.supportedVersions[index];
    if(version.version === "all" && version.checked) {
      this._configurationService.configuration.userConfiguration.filterOptions.versions = [...this._configurationService.configuration.supportedOccVersions];
    } else {
      // Remove all option
      let index = this._configurationService.configuration.userConfiguration.filterOptions.versions.indexOf("all");
      if (index > -1) {
        this._configurationService.configuration.userConfiguration.filterOptions.versions.splice(index, 1);
      }
      if(version.checked) {
        if(!this._configurationService.configuration.userConfiguration.filterOptions.versions.includes(version.version)) {
          this._configurationService.configuration.userConfiguration.filterOptions.versions.push(version.version);
        }
        if(this._configurationService.configuration.userConfiguration.filterOptions.versions.length === (this._configurationService.configuration.supportedOccVersions.length -1)) {
          this._configurationService.configuration.userConfiguration.filterOptions.versions.push("all");
        }
      } else {
        index = this._configurationService.configuration.userConfiguration.filterOptions.versions.indexOf(version.version);
        if (index > -1) {
          this._configurationService.configuration.userConfiguration.filterOptions.versions.splice(index, 1);
        }
      }
    }

    this.updateFilters();
    this._configurationService.saveConfiguration();
    this._environmentsService.runSearch();
  }

  private updateFilters() {
    this.supportedVersions.forEach(item => {
      item.checked = this.userConf.filterOptions.versions.includes(item.version);
    });
  }

  updateResults() {
    if(this.userConf.extensionConfiguration.search.startsWith("/")) {
      this._easterEggService.stopAll();
      if(this._easterEggService.isEaterEgg(this.userConf.extensionConfiguration.search.substring(1))) {
        this._easterEggService.runEaterEgg(this.userConf.extensionConfiguration.search.substring(1));
      } else {
      }
    } else {
      this._easterEggService.stopAll();
      this._environmentsService.runSearch();
      this._configurationService.saveConfiguration();
    }
  }

  clearSearch() {
    this.userConf.extensionConfiguration.search = "";
    this._easterEggService.stopAll();
    this.updateResults();
  }

  resetFilters() {
    this.userConf.filterOptions.versions = [...this._configurationService.configuration.supportedOccVersions];
    this.supportedVersions.forEach(version => {
      version.checked = this.userConf.filterOptions.versions.includes(version);
    });
    this.userConf.filterOptions.aws = "mixed";
    this.userConf.filterOptions.dev = true;
    this.userConf.filterOptions.int = true;
    this.userConf.filterOptions.qa = true;
    this.userConf.filterOptions.prod = true;
    this.userConf.filterOptions.preprod = true;
    this.userConf.filterOptions.others = true;
    this._configurationService.saveConfiguration();
    this.updateFilters();
    this._environmentsService.runSearch();
  }

  numberOfActiveFilters() {
    return this.userConf.filterOptions.versions.filter(function(element){return element !== 'all';}).length
  }

  checkAWSFilter() {
    switch (this.userConf.filterOptions.aws) {
      case "strict": {
        this.userConf.filterOptions.aws = "hide";
        break;
      }
      case "hide": {
        this.userConf.filterOptions.aws = "mixed";
        break;
      }
      case "mixed": {
        this.userConf.filterOptions.aws = "strict";
        break;
      }
    }
    this.updateResults();
  }
}
