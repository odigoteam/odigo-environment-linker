import {Component, OnInit} from '@angular/core';
import {EnvironmentsService} from "../../../../services/environments.service";
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserOptions} from "../../../../models/settings.class";
import {AwsEnv, Client, Environment, Module} from '../../../../models/environments.class';
import {BrowserService} from "../../../../services/browser.service";
import {AwsRoleSwitcherService} from "../../../../services/aws-role-switcher.service";
import {Router, UrlSerializer} from "@angular/router";
import {CustomLinksService} from "../../../../services/custom-links.service";

@Component({
  selector: 'env-list',
  templateUrl: './env-list.component.html',
  styleUrls: ['./env-list.component.css']
})
export class EnvListComponent implements OnInit {
  private readonly CUSTOM_LINKS_GROUP_SIZE = 15;
  nbResults: number = 0;
  totalEnvs: number = 0;
  environments: Environment[] = [];
  customLinks: any[] = [];
  userOptions: UserOptions = new UserOptions();
  isCurrentTabAws: boolean = false;

  constructor(private _environmentsService: EnvironmentsService,
              private _configurationService: ConfigurationService,
              private _customLinksServices: CustomLinksService,
              private _browser: BrowserService,
              private _awsRoleSwitcherService: AwsRoleSwitcherService,
              private _router: Router,
              private _serializer: UrlSerializer) {
    this.userOptions = this._configurationService.configuration.userConfiguration.userOptions;
    this.isCurrentTabAws = this._configurationService.configuration.isCurrentTabAws;

    this.customLinks = _customLinksServices.getLinksGrouped(this.CUSTOM_LINKS_GROUP_SIZE);

    this._environmentsService.numberOfResult.subscribe(value => {
      this.nbResults = value;
    });
  }

  ngOnInit(): void {
    if (this._environmentsService.environments) {
      this.totalEnvs = this._environmentsService.environments.environments.length;
    }
    if (this._environmentsService.environments) {
      this._environmentsService.environments?.environments.forEach(env => {
        this.environments.push(this.configureEnvironment(env));
      });
    }
  }

  configureEnvironment(env: Environment) {
    env.env = env.env.toUpperCase();
    env.type = env.type.toUpperCase();
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

    if(env.logo.indexOf("oROhcV3Mjv+RWlIxJHHfX/DnyPH4+X9PYAAAAASUVORK5CYII=") > 0 && this.userOptions.darkTheme) {
      env.logo = "assets/images/odigo-white.png";
    } else if(env.logo === "assets/images/odigo-white.png" && !this.userOptions.darkTheme) {
      env.logo = "assets/images/odigo-dark.png";
    } else if(env.logo === "assets/images/odigo-dark.png" && this.userOptions.darkTheme) {
      env.logo = "assets/images/odigo-white.png";
    }

    Object.entries(env.urls).forEach(([key, value]) => {
      let displayModule: boolean = false;
      switch (key) {
        case 'console':
          displayModule = this.userOptions.display.console;
          break;
        case 'cxStudio':
          displayModule = this.userOptions.display.cxStudio;
          break;
        case 'hub':
          displayModule = this.userOptions.display.hub;
          break;
        case 'healthCheck':
          displayModule = this.userOptions.display.healthCheck;
          break;
        case 'portal':
          displayModule = this.userOptions.display.portal;
          break;
        case 'pif':
          displayModule = this.userOptions.display.pif;
          break;
        case 'pef':
          displayModule = this.userOptions.display.pef;
          break;
        case 'qualificationCenter':
          displayModule = this.userOptions.display.qualificationCenter;
          break;
        case 'routing':
          displayModule = this.userOptions.display.routing;
          break;
        case 'cmdb':
          displayModule = this.userOptions.display.cmdb;
          break;
        case 'ssh':
          displayModule = this.userOptions.display.ssh;
          break;
      }

      if(key === "hub" && !value) {
        value = new Module();
      }

      value.display = displayModule;
      if(!key.match("(pif|pef)")) {
        if (key.match("(cmdb|ssh)")) {
          if(value.display) {
            value.display = (!!value.master || !!value.slave);
          }
        } else {
          if(value.display) {
            value.display = (!!value.internal || !!value.external);
          }
          value.showExternal = !!value.external && this.userOptions.externalLinks;
        }
      } else {
        if(value.display) {
          value.publisher.display = (!!value.publisher.internal || !!value.publisher.external);
          value.store.display = (!!value.store.internal || !!value.store.external);
        } else {
          value.publisher.display = false;
          value.store.display = false;
        }
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

  openLink(url: string, custom: boolean = false, env: Environment | null = null) {
    if(url) {
      if (custom && env) {
        this._browser.tabs.create({url: this._customLinksServices.parseUrl(url, env)});
      } else {
        this._browser.tabs.create({url});
      }
    }
    window.close();
  }

  switchAWSRole(env: Environment, role: string) {
    const {url, region, notGlobal} = this._awsRoleSwitcherService.getCurrentUrlAndRegion(this._configurationService.configuration.currentTab.url);
    let data = {
      profile: env.env,
      account: env.aws.accountId,
      color: this.computeColorForAWS(env.type),
      roleName: role,
      displayName: env.env + " (" + env.name + ")",
      redirectUri: this._awsRoleSwitcherService.createRedirectUri(url, region, this._configurationService.configuration.userConfiguration.userOptions.aws.region),
      search: env.env.toLowerCase() + ' ' + env.aws.accountId,
      actionSubdomain: ""
    };
    if (notGlobal) {
      data.actionSubdomain = region;
    }
    this._awsRoleSwitcherService.sendSwitchRole(this._configurationService.configuration.currentTab.id,  data);
  }

  openJenkinsLink(env: Environment, jobName: string) {
    let url = this._environmentsService.environments.jenkins.baseUrl;
    if(jobName === "updateCMDB") {
      let params = this.buildParameters(env.client, this._environmentsService.environments.jenkins.updateCmdbJob);
      url = url.concat(params);
    }
    this.openLink(url, true, env);
  }

  private computeColorForAWS(type: string) : string {
    let color;
    switch(type.toUpperCase()) {
      case "PROD":
        color = "db284f";
        break;
      case "PREPROD":
        color = "ffb200";
        break;
      case "QA":
        color = "009cde";
        break;
      case "INT":
        color = "14d9b5";
        break;
      case "DEV":
        color = "212529";
        break;
      default:
        color = "e6e7e8";
        break;
    }
    return color;
  }

  private buildParameters(client: Client, endpoint: string): string {
    let params = "";
    if(this._environmentsService.environments.jenkins.parameters) {
      let queryParams: {
        [key: string]: any
      } = {};
      for (let param in this._environmentsService.environments.jenkins.parameters) {
        if (this._environmentsService.environments.jenkins.parameters.hasOwnProperty(param)) {
          if(client.hasOwnProperty(this._environmentsService.environments.jenkins.parameters[param])) {
            queryParams[param] = encodeURIComponent(client[this._environmentsService.environments.jenkins.parameters[param] as keyof Client]);
          } else {
            queryParams[param] = encodeURIComponent(this._environmentsService.environments.jenkins.parameters[param]);
          }
        }
      }
      const tree = this._router.createUrlTree([endpoint], { queryParams });
      params = this._serializer.serialize(tree);
    }
    return params;
  }

  goToAwsConfiguration() {

  }
}
