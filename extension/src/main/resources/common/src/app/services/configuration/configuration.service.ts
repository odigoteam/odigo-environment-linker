import { Injectable } from '@angular/core';
import {Settings} from "../../models/settings.class";
import {StorageService} from "../storage/storage.service";
import {HttpClient} from "@angular/common/http";
import {Environments} from "../../models/Environments.class";
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

  loadEnvironments(): Observable<Environments> {
    return this.http.get<Environments>(this._configuration.config.confURL);
  }

  save(): void {
    this._storage.set({odigoEnvLinker : this.configuration});
  }

  public get configuration() {
    return this._configuration;
  }

  public set configuration(value: Settings) {
    this._configuration = value;
  }
}
