import { Injectable } from '@angular/core';
import {Settings} from "../models/settings.class";
import {StorageService} from "./storage.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Environments} from "../models/environments.class";
import {Observable} from "rxjs";
import packageJson from "../../../package.json";
import {environment} from "../../environments/environment";
import {messages} from "../../environments/messages";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  readonly configurationStoreKey: string = 'odigoEnvLinker';
  private _configuration: Settings;

  constructor(private _storage: StorageService,
              private http: HttpClient) {
    this._configuration = new Settings();
    this._configuration.currentExtensionVersion = packageJson.version;
  }

  loadConfiguration(callback: any): void {
    this._storage.get(this.configurationStoreKey).then((data: any) => {
      this._configuration.config = { ...this._configuration.config, ...data.odigoEnvLinker };
      this._configuration.currentExtensionVersion = packageJson.version;
      callback(!!data.odigoEnvLinker);
    });
  }

  loadEnvironments(): Observable<HttpResponse<Environments>> {
    return this.http.get<Environments>(this._configuration.config.confURL, {observe: 'response', responseType: 'json'});
  }

  saveConfiguration(): void {
    this._configuration.config.latestExtensionVersionUsed = packageJson.version;
    this._storage.set({odigoEnvLinker : this._configuration.config});
  }

  validateConfigURL(value: string): Observable<any> {
    return new Observable<any>( observer => {
      let hasError = false;
      let message = "";
      let confURL = value;
      if (confURL && confURL !== "" ) {
        if (confURL.indexOf("https://") === 0) {
          if (!confURL.match(environment.configurationUrlPattern)) {
            hasError = true;
            message = messages.confUrl.urlPattern;
          } else {
            this._configuration.config.confURL = confURL;
          }
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
        this.http.get<Environments>(value, {observe: 'response', responseType: 'json'}).subscribe(
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
    });
  }

  public get configuration() {
    return this._configuration;
  }

  public set configuration(value: Settings) {
    this._configuration = value;
  }
}
