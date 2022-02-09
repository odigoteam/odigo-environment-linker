import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CONFIGURATION_VIEW, ENV_VIEW, LOADER_VIEW} from "./app.routes";
import {ConfigurationService} from "./services/configuration/configuration.service";
import {Environments} from "./models/environments.class";
import {EnvironmentsService} from "./services/environment/environments.service";
import {DOCUMENT} from "@angular/common";
import {BrowserService} from "./services/browser/browser.service";
import {AwsRoleSwitcherService} from "./services/aws-role-switcher/aws-role-switcher.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  icon: string = "toggles";

  constructor(private _router: Router,
              private _configurationService: ConfigurationService,
              private _environmentsService: EnvironmentsService,
              private _awsRoleSwitcherService: AwsRoleSwitcherService,
              @Inject(DOCUMENT) private _document: Document) {
  }

  ngOnInit(): void {
    this._configurationService.loadConfiguration(() => {

      this._awsRoleSwitcherService.initializeSwitcher();

      if(this._configurationService.configuration.config.options.darkTheme) {
        this._document.body.classList.add('theme-dark');
        this._document.body.classList.remove('theme-light');
      } else {
        this._document.body.classList.add('theme-light');
        this._document.body.classList.remove('theme-dark');
      }

      if(this._configurationService.configuration.config.confURL) {
        this._configurationService.loadEnvironments().subscribe((envs: Environments)=> {
          this._environmentsService.environments = envs;
          this._router.navigate([ENV_VIEW]);
        });
      } else {
        this._router.navigate([CONFIGURATION_VIEW]);
      }
    });
  }

  displayConfiguration() {
    if (this._router.url.endsWith(CONFIGURATION_VIEW)) {
      this.icon = "toggles";
      this._router.navigate([LOADER_VIEW]);
      this._configurationService.loadConfiguration(() => {
        this._router.navigate([ENV_VIEW]);
      });
    } else {
      this._router.navigate([CONFIGURATION_VIEW]);
      this.icon = "x-lg";
    }
  }
}
