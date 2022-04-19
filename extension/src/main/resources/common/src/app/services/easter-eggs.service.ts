import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ConfigurationService} from "./configuration.service";
import {CelebrateEasterEgg} from "./easter-eggs/celebrate.class";
import {RedPillEasterEgg} from "./easter-eggs/redpill.class";
import {UpsideDownEasterEgg} from "./easter-eggs/upside-down.class";
import {CoffeeEasterEgg} from "./easter-eggs/coffee.class";

@Injectable({
  providedIn: 'root'
})
export class EasterEggsService {

  private _easterEggs: Map<string, EasterEgg> = new Map([
    [ "upside down", new UpsideDownEasterEgg(this._document) ],
    [ "celebrate", new CelebrateEasterEgg() ],
    [ "coffee", new CoffeeEasterEgg(this._document) ],
    [ "red pill", new RedPillEasterEgg(this._document, this._configurationService) ]
  ]);

  constructor(@Inject(DOCUMENT) private _document: Document,
              private _configurationService: ConfigurationService) {
  }

  isEaterEgg(term: string): boolean {
    let wasEA: boolean = false;
    if (this._easterEggs.has(term)) {
      this.stopAll();
      // @ts-ignore
      this._easterEggs.get(term).run();
      wasEA = true;
    }
    return wasEA;
  }

  stopAll() {
    this._easterEggs.forEach((easterEgg, key) => {
      if(easterEgg.active) {
        easterEgg.stop();
      }
    });
  }
}
