import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnvironmentsService} from "../../../../services/environments.service";
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserOptions} from "../../../../models/settings.class";
import {AwsEnv, Environment } from '../../../../models/environments.class';
import {BrowserService} from "../../../../services/browser.service";
import {AwsRoleSwitcherService} from "../../../../services/aws-role-switcher.service";

@Component({
  selector: 'env-list',
  templateUrl: './env-list.component.html',
  styleUrls: ['./env-list.component.css']
})
export class EnvListComponent implements OnInit {
  nbResults: number = 0;
  totalEnvs: number = 0;
  environments: Environment[] = [];
  userOptions: UserOptions = new UserOptions();
  isCurrentTabAws: boolean = false;
  awsLogoImageUrl: string = "assets/images/logo-aws-dark.png";


  constructor(private _environmentsService: EnvironmentsService,
              private _configurationService: ConfigurationService,
              private _browser: BrowserService,
              private _awsRoleSwitcherService: AwsRoleSwitcherService) {
    this.userOptions = this._configurationService.configuration.config.options;
    this.isCurrentTabAws = this._configurationService.configuration.isCurrentTabAws;
    this._environmentsService.numberOfResult.subscribe(value => {
      this.nbResults = value;
    });
  }

  ngOnInit(): void {
    if (this._environmentsService.environments) {
      this.totalEnvs = this._environmentsService.environments.environments.length;
    }
    if (this.userOptions.darkTheme) {
      this.awsLogoImageUrl = "assets/images/logo-aws-white.png";
    }
    if (this._environmentsService.environments) {
      this._environmentsService.environments?.environments.forEach(env => {
        this.environments.push(this.configureEnvironment(env));
      });
    }
  }

  configureEnvironment(env: Environment) {
    switch(env.type) {
      case "PROD":
        env.badgeType = "bg-danger";
        break;
      case "PREPROD":
        env.badgeType = "bg-warning text-dark";
        break;
      case "QA":
        env.badgeType = "bg-info";
        break;
      case "INT":
        env.badgeType = "bg-success";
        break;
      case "DEV":
        env.badgeType = "bg-dark";
        break;
      default:
        env.badgeType = "bg-secondary text-dark";
        break;
    }

    if(env.logo.endsWith("roROhcV3Mjv+RWlIxJHHfX/DnyPH4+X9PYAAAAASUVORK5CYII=") &&
      this.userOptions.darkTheme) {
      env.logo = "odigo-white.png";
    } else if(env.logo === "images/odigo-white.png" && !this.userOptions.darkTheme) {
      env.logo = "odigo-dark.png";
    } else if(env.logo === "images/odigo-dark.png" && this.userOptions.darkTheme) {
      env.logo = "odigo-white.png";
    }

    Object.entries(env.urls).forEach(([key, value]) => {
      let displayOption: boolean = false;
      switch (key) {
        case 'console':
          displayOption = this.userOptions.display.console;
          break;
        case 'healthCheck':
          displayOption = this.userOptions.display.healthCheck;
          break;
        case 'portal':
          displayOption = this.userOptions.display.portal;
          break;
        case 'pif':
          displayOption = this.userOptions.display.pif;
          break;
        case 'pef':
          displayOption = this.userOptions.display.pef;
          break;
        case 'routing':
          displayOption = this.userOptions.display.routing;
          break;
        case 'cmdb':
          displayOption = this.userOptions.display.cmdb;
          break;
        case 'ssh':
          displayOption = this.userOptions.display.ssh;
          break;
      }

      if(!key.match("(pif|pef)")) {
        if (key.match("(cmdb|ssh)")) {
          value.display = (!!value.master || !!value.slave) && displayOption;
        } else {
          value.display = (!!value.internal || !!value.external) && displayOption;
          value.showExternal = !!value.external && this.userOptions.externalLinks;
        }
      } else {
        value.publisher.display = (!!value.publisher.internal || !!value.publisher.external) && displayOption;
        value.store.display = (!!value.internal || !!value.external) && displayOption;
        if (key === "pef") {
          value.store.showExternal = !!value.store.external && this.userOptions.externalLinks;
        }
      }
    });

    if(!env.aws) {
      env.aws = new AwsEnv();
    }
    env.aws.display = (env.provider === "AWS") && this.userOptions.display.aws;
    env.aws.enabled = this._configurationService.configuration.isCurrentTabAws;

    return env;
  }

  openLink(url: string | undefined ) {
    this._browser.tabs.create({url});
  }

  switchAWSRole(env: Environment) {
    const {url, region, notGlobal} = this._awsRoleSwitcherService.getCurrentUrlAndRegion(this._configurationService.configuration.currentTab.url);
    let data = {
      profile: env.env,
      account: env.aws.accountId,
      color: "ff3466",
      roleName: this._configurationService.configuration.config.options.aws.role,
      displayName: env.env + " (" + env.name + ")",
      redirectUri: this._awsRoleSwitcherService.createRedirectUri(url, region, this._configurationService.configuration.config.options.aws.region),
      search: env.env.toLowerCase() + ' ' + env.aws.accountId,
      actionSubdomain: ""
    };
    if (notGlobal) {
      data.actionSubdomain = region;
    }
    this._awsRoleSwitcherService.sendSwitchRole(this._configurationService.configuration.currentTab.id,  data);
  }
}
