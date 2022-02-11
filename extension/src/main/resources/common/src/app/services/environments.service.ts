import { Injectable } from '@angular/core';
import {Environment, Environments} from "../models/environments.class";
import {ConfigurationService} from "./configuration.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService {
  environments: Environments = new Environments();
  numberOfResult: Subject<number> = new Subject<number>();

  constructor(private _configuration: ConfigurationService) {
    this.numberOfResult.next(0);
  }

  runSearch() {
    if(this._configuration.configuration.config.options.extendedSearch) {
      this.searchExtended();
    } else {
      this.searchStrict();
    }
  }

  private searchStrict() {
    this.environments.environments.forEach((env) => {
      let filter = this.matchWithFilters(env);
      if(this._configuration.configuration.config.search.length >= 1) {
        let match = this.matchWithSearch(env, this._configuration.configuration.config.search);
        env.displayed = match && filter;
      } else {
        env.displayed = filter;
      }
    });
    this.numberOfResult.next(this.environments.environments.filter(env => env.displayed).length);
  }

  private searchExtended() {
    let maximumLength = Math.max(...this.environments.environments.map<number>((env) => {
      return this.lengthOfMatching(env, this._configuration.configuration.config.search);
    }));
    this.environments.environments.forEach(env => {
      env.displayed = this.matchWithSearchWithLongestCommonSubsequence(env, this._configuration.configuration.config.search, maximumLength) && this.matchWithFilters(env);
    });
    this.numberOfResult.next(this.environments.environments.filter(env => env.displayed).length);
  }

  private matchWithFilters(env: Environment) {
    let match;
    switch (env.type) {
      case "DEV":
        match = this._configuration.configuration.config.filters.dev;
        break;
      case "INT":
        match = this._configuration.configuration.config.filters.int;
        break;
      case "QA":
        match = this._configuration.configuration.config.filters.qa;
        break;
      case "PREPROD":
        match = this._configuration.configuration.config.filters.preprod;
        break;
      case "PROD":
        match = this._configuration.configuration.config.filters.prod;
        break;
      default:
        match = this._configuration.configuration.config.filters.others;
        break;
    }

    if(this._configuration.configuration.config.filters.aws) {
      match = match && (env.provider === "AWS");
    }

    if(!this._configuration.configuration.config.filters.versions.includes("all")) {
      let currentVersion;
      if(env.occVersion.match("^[0-9]{1}\.[0-9]{1,2}.*$")) {
        let occVersionParts = env.occVersion.split(".");
        currentVersion = occVersionParts[0] + "." + occVersionParts[1];
      } else {
        currentVersion = env.occVersion;
      }
      match = match && this._configuration.configuration.config.filters.versions.includes(currentVersion);
    }

    return match;
  }

  private matchWithSearch(env: Environment, term: string) {
    return (env.env.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
      env.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  private matchWithSearchWithLongestCommonSubsequence(env: Environment, term: string, maximumLength: number) {
    return this.lengthOfMatching(env, term) === maximumLength;
  }

  private lengthOfMatching(env: Environment, term: string) {
    let lengthIdClientMatching = this.longestCommonSubsequence(env.env.toLowerCase(), term.toLowerCase());
    let lengthNameMatching = this.longestCommonSubsequence(env.name.toLowerCase(), term.toLowerCase());
    return Math.max(lengthIdClientMatching, lengthNameMatching)
  }

  private longestCommonSubsequence(text1: string, text2: string) {
    let dp = Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0))
    for (let i = 1; i < dp.length; i++)
      for (let j = 1; j < dp[i].length; j++)
        if (text1[i - 1] === text2[j - 1])
          dp[i][j] = dp[i - 1][j - 1] + 1
        else
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
    return dp[text1.length][text2.length]
  }
}
