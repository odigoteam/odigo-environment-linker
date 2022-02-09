import { Injectable } from '@angular/core';
import {BrowserService} from "../browser/browser.service";
import {ConfigurationService} from "../configuration/configuration.service";

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
      this._configurationService.configuration.currentTab.id = tabs[0].id;
      let url: URL = new URL(tabs[0].url);
      console.log(url)
      if (url.host.endsWith('.aws.amazon.com') || url.host.endsWith('.amazonaws-us-gov.com') || url.host.endsWith('.amazonaws.cn')) {
        this._configurationService.configuration.isCurrentTabAws = true;
        this.executeAction(this._configurationService.configuration.currentTab.id, 'loadInfo', {});
      }
      console.log("is AWS tab : "  + this._configurationService.configuration.isCurrentTabAws);
    });
  }

  executeAction(tabId: number, action: string, data: any) {
    return this._browserService.tabs.sendMessage(tabId, {action, data}, {});
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
}
