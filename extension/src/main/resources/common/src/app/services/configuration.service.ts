import { Injectable } from '@angular/core';
import {Settings} from "../models/settings.class";
import {StorageService} from "./storage.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Environments} from "../models/environments.class";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  readonly storeKey: string = 'odigoEnvLinker';
  private _configuration: Settings;

  constructor(private _storage: StorageService,
              private http: HttpClient) {
    this._configuration = new Settings();
  }

  loadConfiguration(callback: any): void {
    this._storage.get(this.storeKey).then((data: any) => {
      this.configuration = { ...this._configuration, ...data.odigoEnvLinker };
      callback();
    });
  }

  loadEnvironments(): Observable<HttpResponse<Environments>> {
    return this.http.get<Environments>(this._configuration.config.confURL, {observe: 'response', responseType: 'json'});
  }

  save(): void {
    this._storage.set({odigoEnvLinker : this.configuration});
  }

  validateConfigURL(value: string): any {
    let hasError = false;
    let message = "&nbsp;";
    let confURL = value;
    if (confURL && confURL !== "" ) {
      if (confURL.indexOf("https://") === 0) {
        if (!confURL.match("https:\/\/.+\/raw\/(master|develop)\/configuration\.json")) {
          hasError = true;
          message = "The URL must end with '/raw/master/configuration.json'.";
        } else {
          this.configuration.config.confURL = confURL;
        }
      } else {
        hasError = true;
        message = "The URL must start by 'https://'.";
      }
    } else {
      hasError = true;
      message = "URL cannot be empty.";
    }
    return {
      hasError,
      message
    };
  }

  public get configuration() {
    return this._configuration;
  }

  public set configuration(value: Settings) {
    this._configuration = value;
  }
}
