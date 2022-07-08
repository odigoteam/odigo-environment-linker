import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";
import {environment} from "../../../../../environments/environment";
import {DataBusService} from "../../../../services/data-bus.service";
import {Observable} from "rxjs";
import {messages} from "../../../../../environments/messages";
import {Environment, Environments} from "../../../../models/environments.class";
import {HttpClient} from "@angular/common/http";
import {BrowserService} from "../../../../services/browser.service";

@Component({
  selector: 'app-behaviour',
  templateUrl: './behaviour.component.html',
  styleUrls: ['./behaviour.component.css', "../conf-view/conf-view.component.css"]
})
export class BehaviourComponent implements OnInit {
  userConfiguration: UserConfiguration = new UserConfiguration();
  motionPlanningURL: string = environment.motionPlanning;
  motionUrl: string = "";
  urlCheckState: string = "";
  motionUrlErrorMessage: string = "";

  constructor(private _configurationService: ConfigurationService,
              private _dataBusService: DataBusService,
              private http: HttpClient,
              private _browser: BrowserService,) {
    this.userConfiguration = this._configurationService.configuration.userConfiguration;
    this.motionUrl = this._configurationService.configuration.userConfiguration.extensionConfiguration.motionURL;
  }

  ngOnInit(): void {
    if(this.userConfiguration.userOptions.useMotionTool) {
      this.checkMotionUrl();
    }
  }

  updateCMDBFileType(type: string) {
    this.userConfiguration.userOptions.cmdbFileType = type;
    this._configurationService.saveUserConfiguration();
  }

  checkMotionUrl() {
    this._dataBusService.showMotionButton.next(this._configurationService.configuration.userConfiguration.userOptions.useMotionTool);
    if(this._configurationService.configuration.userConfiguration.userOptions.useMotionTool) {
      this.motionUrlErrorMessage = "";
      this.urlCheckState = 'pending';
      new Observable<any>( observer => {
        let hasError = false;
        let message = "";
        if (this.motionUrl && this.motionUrl !== "" ) {
          if (this.motionUrl.indexOf("https://") === 0) {
            this._configurationService.configuration.userConfiguration.extensionConfiguration.motionURL = this.motionUrl;
            this._configurationService.saveExtensionConfiguration();
          } else {
            hasError = true;
            message = messages.confUrl.httpsMissing;
          }
        } else {
          hasError = true;
          message = messages.confUrl.empty;
        }
        if(hasError) {
          observer.error({
            hasError,
            message
          });
        } else {
          this.http.get<Environments>(this.motionUrl, {observe: 'response', responseType: 'json'}).subscribe(
            (response) => {
              observer.next({
                hasError: false,
                message: response.statusText
              });
            },
            (error) => {
              console.error(error);
              observer.error({
                hasError: true,
                message: messages.confUrl.invalid
              });
            },
            () => {
              observer.complete();
            }
          );
        }
      }).subscribe(
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
    } else {
      this._configurationService.saveUserConfiguration();
    }
  }

  // open link in a new tab and close extension
  openLink(url: string, custom: boolean = false, env: Environment | null = null) {
    if(url) {
      this._browser.tabs.create({url});
    }
    window.close();
  }

  saveUserConfiguration() {
    this._configurationService.saveUserConfiguration()
  }
}
