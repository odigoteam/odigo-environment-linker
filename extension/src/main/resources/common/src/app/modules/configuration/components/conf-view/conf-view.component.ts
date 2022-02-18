import {Component, Inject } from '@angular/core';
import packageJson from '../../../../../../package.json';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";
import {DOCUMENT} from "@angular/common";
import {DataBusService} from "../../../../services/data-bus.service";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'conf-view',
  templateUrl: './conf-view.component.html',
  styleUrls: ['./conf-view.component.css']
})
export class ConfViewComponent {
  public appVersion: string = packageJson.version;
  activeTab: string = "configuration";
  configUrl: string = "";
  confUrlErrorMessage: string = "";
  awsRoleErrorMessage: string = "";
  userConfiguration: UserConfiguration = new UserConfiguration();

  constructor(private _configurationService: ConfigurationService,
              private _dataBusService: DataBusService,
              @Inject(DOCUMENT) private _document: Document) {
    this.userConfiguration = this._configurationService.configuration.config;
    this.configUrl = this._configurationService.configuration.config.confURL;
    this._dataBusService.confBtnIcon.next("save");
    this._dataBusService.confBtnDisabled.next(false);
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
    this.confUrlErrorMessage = "";
    this._configurationService.validateConfigURL(this.configUrl).subscribe(
      next => {
        if (next.hasError) {
          this._dataBusService.confBtnDisabled.next(true);
          this.confUrlErrorMessage = next.message;
        } else {
          this._dataBusService.confBtnDisabled.next(false);
          this.saveConfig();
        }
      },
      error => {
        this._dataBusService.confBtnDisabled.next(true);
        this.confUrlErrorMessage = error.message;
      });
  }

  checkAwsRole() {
    let validation = {
      hasError: false,
      message: ""
    };
    if(!this.userConfiguration.options.aws.role) {
      validation.hasError = true;
      validation.message = "Role cannot be empty."
    }
    this.awsRoleErrorMessage = validation.message;
    if(!validation.hasError) {
      this.awsRoleErrorMessage = "";
      this.saveConfig();
    }
  }

  navTab(tabName: string) {
    this.activeTab = tabName;
  }
}
