import {Component, Inject, OnInit} from '@angular/core';
import packageJson from '../../../../../../package.json';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'conf-view',
  templateUrl: './conf-view.component.html',
  styleUrls: ['./conf-view.component.css']
})
export class ConfViewComponent implements OnInit {
  public appVersion: string = packageJson.version;
  configUrl: string = "";
  errorMessage: string = "&nbsp;";
  userConfiguration: UserConfiguration = new UserConfiguration();

  constructor(private _configurationService: ConfigurationService,
              @Inject(DOCUMENT) private _document: Document) {
    if (this._configurationService.configuration.config) {
      this.userConfiguration = this._configurationService.configuration.config;
      this.configUrl = this._configurationService.configuration.config.confURL;
    }
  }

  ngOnInit(): void {
  }

  saveConfig(): void {
    this._configurationService.save();
  }

  applyTheme() {
    if(this.userConfiguration.options.darkTheme) {
      this._document.body.classList.add('theme-dark');
      this._document.body.classList.remove('theme-light');
    } else {
      this._document.body.classList.add('theme-light');
      this._document.body.classList.remove('theme-dark');
    }
    this.saveConfig();
  }

  checkConfigUrl() {
    let validation = this._configurationService.validateConfigURL(this.configUrl);
    this.errorMessage = validation.message;
    if(!validation.hasError) {
      this.saveConfig();
    }
  }
}
