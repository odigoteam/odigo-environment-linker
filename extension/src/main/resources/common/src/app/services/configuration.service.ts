import { Injectable } from '@angular/core';
import {Settings} from "../models/settings.class";
import {StorageService} from "./storage.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Environments} from "../models/environments.class";
import {catchError, Observable, tap} from "rxjs";
import packageJson from "../../../package.json";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  readonly storeKey: string = 'odigoEnvLinker';
  private _configuration: Settings;

  constructor(private _storage: StorageService,
              private http: HttpClient) {
    this._configuration = new Settings();
    this._configuration.currentExtensionVersion = packageJson.version;
  }

  loadConfiguration(callback: any): void {
    this._storage.get(this.storeKey).then((data: any) => {
      console.log(!!data.odigoEnvLinker)
      this._configuration = { ...this._configuration, ...data.odigoEnvLinker };
      this._configuration.currentExtensionVersion = packageJson.version;
      callback(!!data.odigoEnvLinker);
    });
  }

  loadEnvironments(): Observable<HttpResponse<Environments>> {
    return this.http.get<Environments>(this._configuration.config.confURL, {observe: 'response', responseType: 'json'});
  }

  save(): void {
    this._configuration.config.latestExtensionVersionUsed = packageJson.version;
    this._storage.set({odigoEnvLinker : this._configuration});
  }

  validateConfigURL(value: string): Observable<any> {
    return new Observable<any>( observer => {
      let hasError = false;
      let message = "";
      let confURL = value;
      if (confURL && confURL !== "" ) {
        if (confURL.indexOf("https://") === 0) {
          if (!confURL.match("https:\/\/.+\/raw\/(master|develop)\/configuration\.json")) {
            hasError = true;
            message = "The URL must end with '/raw/master/configuration.json'.";
          } else {
            this._configuration.config.confURL = confURL;
          }
        } else {
          hasError = true;
          message = "The URL must start by 'https://'.";
        }
      } else {
        hasError = true;
        message = "URL cannot be empty.";
      }
      if(hasError) {
        observer.error({
          hasError,
          message
        });
      } else {
        this.http.get<Environments>(value, {observe: 'response', responseType: 'json'}).subscribe(
          (response) => {
            observer.next({
              hasError: false,
              message: response.statusText
            });                       //Next callback
          },
          (error) => {
            console.error(error);
            observer.error({
              hasError: true,
              message: "Oops... Your URL is invalid or your are disconnected from your VPN."
            });                   //Error callback
          },
          () => {
            observer.complete();
          }
        );
      }
    });
  }

  public get configuration() {
    return this._configuration;
  }

  public set configuration(value: Settings) {
    this._configuration = value;
  }
}
