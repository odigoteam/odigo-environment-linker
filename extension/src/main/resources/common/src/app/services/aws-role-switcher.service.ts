import { Injectable } from '@angular/core';
import {BrowserService} from "./browser.service";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class AwsRoleSwitcherService {

  constructor(private _browserService: BrowserService,
              private _configurationService: ConfigurationService) { }

  initializeSwitcher() {
    this._browserService.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, (tabs: any) => {
      let url: URL = new URL(tabs[0].url);
      this._configurationService.configuration.currentTab.url = url;
      this._configurationService.configuration.currentTab.id = tabs[0].id;
      console.log(url);
      console.log(this._configurationService.configuration.isCurrentTabAws);
      if (url.host.endsWith('.aws.amazon.com') || url.host.endsWith('.amazonaws-us-gov.com') || url.host.endsWith('.amazonaws.cn')) {
        this._configurationService.configuration.isCurrentTabAws = true;
        this.executeAction(this._configurationService.configuration.currentTab.id, 'loadInfo', {});
      }
      console.log(this._configurationService.configuration.isCurrentTabAws);
    });
  }

  private executeAction(tabId: number, action: string, data: any) {
    if (this._browserService.isChrome) {
      return new Promise((callback) => {
        return this._browserService.tabs.sendMessage(tabId, {action, data}, {}, callback);
      });
    } else {
      return this._browserService.tabs.sendMessage(tabId, {action, data}, {});
    }
  }

  sendSwitchRole(tabId: number, data: any) {
    this.executeAction(tabId, 'switch', data).then(() => {
      window.close();
    });
  }

  getCurrentUrlAndRegion(aURL: URL) {
    const url = aURL.href;
    let region = '';
    const md = aURL.search.match(/region=([a-z\-1-9]+)/);
    if (md) region = md[1];
    const notGlobal = /^[a-z]{2}\-[a-z]+\-[1-9]\.console\.aws/.test(aURL.host);
    return {url, region, notGlobal};
  }

  createRedirectUri(currentUrl: string, curRegion: string, destRegion: string) {
    let redirectUri = currentUrl;
    if (curRegion && destRegion && curRegion !== destRegion) {
      redirectUri = redirectUri.replace('region=' + curRegion, 'region=' + destRegion);
    }
    return encodeURIComponent(redirectUri);
  }
}
