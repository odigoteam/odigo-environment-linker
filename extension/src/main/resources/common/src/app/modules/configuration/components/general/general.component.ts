import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {messages} from "../../../../../environments/messages";
import {DataBusService} from "../../../../services/data-bus.service";
import {UserConfiguration} from "../../../../models/settings.class";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css', "../conf-view/conf-view.component.css"]
})
export class GeneralComponent implements OnInit {
  configUrl: string = "";
  urlCheckState: string = "";
  confUrlErrorMessage: string = "";
  awsRoleErrorMessage: string = "";
  userConfiguration: UserConfiguration = new UserConfiguration();

  constructor(private _configurationService: ConfigurationService,
              private _dataBusService: DataBusService) {
    this.configUrl = this._configurationService.configuration.userConfiguration.extensionConfiguration.confURL;
    this.userConfiguration = this._configurationService.configuration.userConfiguration;
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
    this._configurationService.saveConfiguration();
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
    if(!this.userConfiguration.userOptions.aws.role) {
      validation.hasError = true;
      validation.message = messages.aws.roleEmpty;
    }
    this.awsRoleErrorMessage = validation.message;
    this._dataBusService.confBtnDisabled.next(validation.hasError);
    if(!validation.hasError) {
      this.awsRoleErrorMessage = "";
      this.saveConfig();
    }
  }
}
