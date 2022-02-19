import {Component, Inject, OnInit} from '@angular/core';
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
export class ConfViewComponent implements OnInit {
  public appVersion: string = packageJson.version;
  activeTab: string = "configuration";
  configUrl: string = "";
  urlCheckState: string = "";
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

  ngOnInit(): void {
    this.urlCheckState = 'pending';
    this._configurationService.validateConfigURL(this.configUrl).subscribe(
      next => {
        if (next.hasError) {
          this.urlCheckState = 'warning';
        } else {
          this.urlCheckState = 'success';
        }
      },
      error => {
        this.urlCheckState = 'error';
      });
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
    this.urlCheckState = 'pending';
    this._configurationService.validateConfigURL(this.configUrl).subscribe(
      next => {
        if (next.hasError) {
          this._dataBusService.confBtnDisabled.next(true);
          this.confUrlErrorMessage = next.message;
          this.urlCheckState = 'warning';
        } else {
          this._dataBusService.confBtnDisabled.next(false);
          this.urlCheckState = 'success';
          this.saveConfig();
        }
      },
      error => {
        this.urlCheckState = 'error';
        this._dataBusService.confBtnDisabled.next(true);
        this.confUrlErrorMessage = error.message;
      });
  }

  checkAwsRole() {
    let validation = {
      hasError: false,
      message: ""
    };
    this._dataBusService.confBtnDisabled.next(true);
    if(!this.userConfiguration.options.aws.role) {
      validation.hasError = true;
      validation.message = "Role cannot be empty."
    }
    this.awsRoleErrorMessage = validation.message;
    this._dataBusService.confBtnDisabled.next(validation.hasError);
    if(!validation.hasError) {
      this.awsRoleErrorMessage = "";
      this.saveConfig();
    }
  }

  navTab(tabName: string) {
    this.activeTab = tabName;
  }
}
