import {Injectable} from '@angular/core';
import {CustomLink} from "../models/custom-link.class";
import {ConfigurationService} from "./configuration.service";
import packageJson from "../../../package.json";
import {StorageService} from "./storage.service";
import {Environment} from "../models/environments.class";

@Injectable({
  providedIn: 'root'
})
export class CustomLinksService {
  private _customLinks: CustomLink[];
  readonly customLinksStoreKey: string = 'customLinks';

  constructor(private _configurationService: ConfigurationService,
              private _storage: StorageService) {
    this._customLinks = [];
  }

  load(callback: any): void {
    this._storage.get(this.customLinksStoreKey).then((data: any) => {
      if(data.customLinks) {
        this._customLinks = data.customLinks;
      }
      callback(!!data.customLinks);
    });
  }

  save(): void {
    this._storage.set({customLinks: this._customLinks});
  }

  getLinksGrouped(groupSize: number): any[] {
    let groupedLinks = [];
    if (this._customLinks && this._customLinks.length > 0) {
      let currentGroup: CustomLink[] = [];
      this._customLinks.forEach((link, index) => {
        if (link.displayed) {
          currentGroup.push(link);
        }
        if ((index + 1) % groupSize === 0) {
          groupedLinks.push([...currentGroup]);
          currentGroup = [];
        }
      });
      if (currentGroup.length > 0) {
        groupedLinks.push([...currentGroup]);
      }
    }
    return groupedLinks;
  }

  parseUrl(url: string, env: Environment): string {
    url = url.replace("[aws-account-id]", encodeURIComponent(env.aws.accountId))
      .replace("[client-id]", encodeURIComponent(env.client.id))
      .replace("[client-name]", encodeURIComponent(env.name))
      .replace("[client-domain]", encodeURIComponent(env.domain))
      .replace("[cluster-id]", encodeURIComponent(env.client.clusterId))
      .replace("[cloud-provider]", encodeURIComponent(env.provider))
      .replace("[env-type]", encodeURIComponent(env.type))
      .replace("[occ-version]", encodeURIComponent(env.occVersion))
      .replace("[site]", encodeURIComponent(env.client.site))
      .replace("[t-shirt-size]", encodeURIComponent(env.tshirtSize));
    return url;
  }

  public get customLinks() {
    return this._customLinks;
  }

  public set customLinks(value: CustomLink[]) {
    this._customLinks = value;
  }
}
