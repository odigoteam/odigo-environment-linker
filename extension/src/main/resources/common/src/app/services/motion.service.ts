import { Injectable } from '@angular/core';
import {MotionPlanning, Wave} from "../models/motion.class";
import {ConfigurationService} from "./configuration.service";
import {Router} from "@angular/router";
import {DataBusService} from "./data-bus.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MotionService {
  motionPlanning: MotionPlanning = new MotionPlanning();

  constructor(private _router: Router,
              private _configurationService: ConfigurationService,
              private _dataBusService: DataBusService) {
  }

  loadPlanning() {
    return new Observable<MotionPlanning>( observer => {
      this._configurationService.loadMotionPlanning().subscribe({
        next: (response) => {
          if(response.body) {
            this.motionPlanning = { ...this.motionPlanning, ...response.body };
            if(this.motionPlanning && this.motionPlanning.waves && this.motionPlanning.waves.length > 0) {
              this.motionPlanning.waves.forEach(wave => {
                wave.displayed = true;
                wave.containsResults = false;
              });
            }
            observer.next(this.motionPlanning);
          }
        },
        error: (error) => {
          observer.error({
            hasError: true,
            code : error.status
          });
        }});
    });
  }

  runSearch() {
    if(this._configurationService.configuration.userConfiguration.userOptions.extendedSearch) {
      this.searchExtended();
    } else {
      this.searchStrict();
    }
  }

  private searchStrict() {
    this.motionPlanning.waves.forEach((wave) => {
      if(this._configurationService.configuration.userConfiguration.extensionConfiguration.motionSearch.length >= 1) {
        wave.displayed = this.matchWithSearch(wave.name);
        wave.containsResults = false;
        wave.moves.forEach((move) => {
          let match = this.matchWithSearch(move.name) ||
            this.matchWithSearch(move.src) ||
            this.matchWithSearch(move.dest) ||
            this.matchWithSearch(move.version_src) ||
            this.matchWithSearch(move.version_dest);
          if(!wave.containsResults) {
            wave.containsResults = match;
          }
          if(match) {
            move.highlight = true;
            wave.displayed = true;
          } else {
            move.highlight = false;
          }
        });
      } else {
        wave.displayed = true;
        wave.containsResults = false;
        wave.moves.forEach((move) => {
          move.highlight = true;
        });
      }
    });
  }

  private searchExtended() {
    let maximumLength = Math.max(...this.motionPlanning.waves.map<number>((wave) => {
      return this.lengthOfMatching(wave);
    }));
    this.motionPlanning.waves.forEach(wave => {
      wave.displayed = this.matchWithSearchWithLongestCommonSubsequence(wave, maximumLength);
    });
  }

  private matchWithSearch(str: string) {
    return str.toLowerCase().indexOf(this._configurationService.configuration.userConfiguration.extensionConfiguration.motionSearch.toLowerCase()) > -1;
  }

  private matchWithSearchWithLongestCommonSubsequence(wave: Wave, maximumLength: number) {
    return this.lengthOfMatching(wave) === maximumLength;
  }

  private lengthOfMatching(wave: Wave) {
    let lengthIdClientMatching = this.longestCommonSubsequence(wave.name.toLowerCase(), this._configurationService.configuration.userConfiguration.extensionConfiguration.motionSearch.toLowerCase());
    let lengthNameMatching = this.longestCommonSubsequence(wave.name.toLowerCase(), this._configurationService.configuration.userConfiguration.extensionConfiguration.motionSearch.toLowerCase());
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
