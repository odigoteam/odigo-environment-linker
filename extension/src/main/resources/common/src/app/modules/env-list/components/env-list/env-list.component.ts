import { Component, OnInit } from '@angular/core';
import {EnvironmentsService} from "../../../../services/environment/environments.service";
import {Environment} from "../../../../models/Environment.class";
import {EnvDisplayOptions} from "../../../../models/env-display-options.class";
import {ConfigurationService} from "../../../../services/configuration/configuration.service";
import {UserOptions} from "../../../../models/settings.class";

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
  awsLogoImageUrl: string = "images/logo-aws-dark.png";


  constructor(private _environmentsService: EnvironmentsService,
              private _configurationService: ConfigurationService) {
    if(this._configurationService.configuration.config && this._configurationService.configuration.config?.options)
      this.userOptions = this._configurationService.configuration.config.options;
    this.isCurrentTabAws = this._configurationService.configuration.isCurrentTabAws;
    if (this._environmentsService.environments) {
      this._environmentsService.environments?.environments.forEach(env => {
        this.environments.push(this.configureEnvironment(env));
      });
    }
  }

  ngOnInit(): void {
    if (this._environmentsService.environments) {
      this.nbResults = this._environmentsService.environments.environments.length;
      this.totalEnvs = this._environmentsService.environments.environments.length;
    }
    if (this.userOptions.darkTheme) {
      this.awsLogoImageUrl = "images/logo-aws-white.png";
    }
  }

  configureEnvironment(env: Environment) {
    if(!env.displayOptions) {
      env.displayOptions = new EnvDisplayOptions();
    }
    switch(env.type) {
      case "PROD":
        env.displayOptions.badgeType = "bg-danger";
        break;
      case "PREPROD":
        env.displayOptions.badgeType = "bg-warning text-dark";
        break;
      case "QA":
        env.displayOptions.badgeType = "bg-info";
        break;
      case "INT":
        env.displayOptions.badgeType = "bg-success";
        break;
      case "DEV":
        env.displayOptions.badgeType = "bg-dark";
        break;
      default:
        env.displayOptions.badgeType = "bg-secondary text-dark";
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

    // if(!env.urls?.console) {
    //   env.urls.console.hasUrls = (!env.urls?.console?.internal || !env.urls?.console?.external);
    //   env.urls.console.hasExternalUrl = (!_.isNil(env.urls?.console.external) && this.userOptions.externalLinks);
    // } else {
    //   env.urls.console = {
    //     hasUrls: false,
    //     hasStoreExternalUrl: false
    //   };
    // }
    //
    // if(!_.isNil(env.urls.healthCheck)) {
    //   env.urls.healthCheck.hasUrls = (!_.isNil(env.urls.healthCheck.internal) || !_.isNil(env.urls.healthCheck.external));
    //   env.urls.healthCheck.hasExternalUrl = (!_.isNil(env.urls.healthCheck.external) && configuration.getUserOption("externalLinks"));
    // }
    //
    // if(!_.isNil(env.urls.portal)) {
    //   env.urls.portal.hasUrls = (!_.isNil(env.urls.portal.internal) || !_.isNil(env.urls.portal.external));
    //   env.urls.portal.hasExternalUrl = (!_.isNil(env.urls.portal.external) && configuration.getUserOption("externalLinks"));
    // } else {
    //   env.urls.portal = {
    //     hasUrls: false,
    //     hasStoreExternalUrl: false
    //   };
    // }
    //
    // if(!_.isNil(env.urls.routing)) {
    //   env.urls.routing.hasUrls = (!_.isNil(env.urls.routing.internal) || !_.isNil(env.urls.routing.external));
    //   env.urls.routing.hasExternalUrl = (!_.isNil(env.urls.routing.external) && configuration.getUserOption("externalLinks"));
    // } else {
    //   env.urls.routing = {
    //     hasUrls: false,
    //     hasStoreExternalUrl: false
    //   };
    // }
    //
    // if(!_.isNil(env.urls.pef)) {
    //   env.urls.pef.hasUrls = !_.isNil(env.urls.pef) && ((!_.isNil(env.urls.pef.publisher) && !_.isNil(env.urls.pef.publisher.internal)) || (!_.isNil(env.urls.pef.store) && !_.isNil(env.urls.pef.store.internal)));
    //   env.urls.pef.hasStoreExternalUrl = !_.isNil(env.urls.pef) && !_.isNil(env.urls.pef.store) && !_.isNil(env.urls.pef.store.external) && configuration.getUserOption("externalLinks");
    // } else {
    //   env.urls.pef = {
    //     hasUrls: false,
    //     hasStoreExternalUrl: false
    //   };
    // }
    //
    // if(!_.isNil(env.urls.pif)) {
    //   env.urls.pif.hasUrls = !_.isNil(env.urls.pif) && ((!_.isNil(env.urls.pif.publisher) && !_.isNil(env.urls.pif.publisher.internal)) || (!_.isNil(env.urls.pif.store) && !_.isNil(env.urls.pif.store.internal)));
    // } else {
    //   env.urls.pif = {
    //     hasUrls: false
    //   };
    // }
    //
    // if(!_.isNil(env.urls.cmdb)) {
    //   env.urls.cmdb.hasUrls = (!_.isNil(env.urls.cmdb.master) || !_.isNil(env.urls.cmdb.slave));
    // } else {
    //   env.urls.cmdb = {
    //     hasUrls: false
    //   };
    // }
    //
    // if(!_.isNil(env.urls.ssh)) {
    //   env.urls.ssh.hasUrls = (!_.isNil(env.urls.ssh.master) || !_.isNil(env.urls.ssh.slave));
    // } else {
    //   env.urls.ssh = {
    //     hasUrls: false
    //   };
    // }
    //
    // env.displayAWSConsoleLink = (env.provider === "AWS") && configuration.getDisplayOption("aws");
    // env.isAWSConsoleLinkEnabled = configuration.isCurrentTabAws;
    // env.userOptions = configuration.options;

    return env;
  }
}
