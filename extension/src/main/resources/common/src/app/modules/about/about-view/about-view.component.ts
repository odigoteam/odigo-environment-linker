import { Component, OnInit } from '@angular/core';
import packageJson from "../../../../../package.json";
import gitVersion from "../../../../git-version.json"
import {environment} from "../../../../environments/environment";
import {BrowserService} from "../../../services/browser.service";
import {Router} from "@angular/router";
import {DataBusService} from "../../../services/data-bus.service";
import {ABOUT_VIEW, ENV_VIEW} from "../../../app.routes";

@Component({
  selector: 'about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent implements OnInit {
  public appVersion: string = packageJson.version;
  public angularVersion: string = packageJson.dependencies["@angular/core"];
  public bootstrapVersion: string = packageJson.dependencies["bootstrap"];
  public gitVersion: string = gitVersion.hash;
  private _backLink: string = "";

  constructor(private _router: Router,
              private _dataBusService : DataBusService,
              private _browser: BrowserService) {
  }

  ngOnInit(): void {
    this._backLink = this._dataBusService.pop(ABOUT_VIEW);
    this._dataBusService.put(ABOUT_VIEW, this._backLink);
  }

  closeAboutView() {
    if (this._backLink) {
      this._router.navigateByUrl(this._backLink);
    } else {
      this._router.navigateByUrl(ENV_VIEW);
    }
  }

  openChangeLogLink() {
    this._browser.tabs.create({url: environment.changelogUrl});
    window.close();
  }


  openIssueLink() {
    this._browser.tabs.create({url: environment.githubUrl});
    window.close();
  }

  openGithubLink() {
    this._browser.tabs.create({url: environment.githubUrl});
    window.close();
  }

  openSlackLink() {
    this._browser.tabs.create({url: environment.slackUrl});
    window.close();
  }

}
