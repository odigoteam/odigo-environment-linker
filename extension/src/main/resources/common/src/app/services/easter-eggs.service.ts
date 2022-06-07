import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ConfigurationService} from "./configuration.service";
import {CelebrateEasterEgg} from "./easter-eggs/celebrate.class";
import {RedPillEasterEgg} from "./easter-eggs/redpill.class";
import {UpsideDownEasterEgg} from "./easter-eggs/upside-down.class";
import {CoffeeEasterEgg} from "./easter-eggs/coffee.class";
import {WeekEndEasterEgg} from "./easter-eggs/week-end.class";
import {AperoEasterEgg} from "./easter-eggs/apero.class";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EasterEggsService {

  private _easterEggs: Map<string, EasterEgg> = new Map([
    [ "apero", new AperoEasterEgg(this._document, this._http) ],
    [ "weekend", new WeekEndEasterEgg(this._document, this._http) ],
    [ "upside down", new UpsideDownEasterEgg(this._document) ],
    [ "celebrate", new CelebrateEasterEgg() ],
    [ "coffee", new CoffeeEasterEgg(this._document) ],
    [ "red pill", new RedPillEasterEgg(this._document, this._configurationService) ]
  ]);

  constructor(@Inject(DOCUMENT) private _document: Document,
              private _configurationService: ConfigurationService,
              private _http: HttpClient) {
  }

  isEaterEgg(term: string): boolean {
    let value: boolean = false;
    if (this._easterEggs.has(term.toLowerCase())) {
      this.stopAll();
      // @ts-ignore
      this._easterEggs.get(term).run();
      value = true;
    }
    return value;
  }

  stopAll() {
    this._easterEggs.forEach((easterEgg, key) => {
      if(easterEgg.active) {
        easterEgg.stop();
      }
    });
  }
}
