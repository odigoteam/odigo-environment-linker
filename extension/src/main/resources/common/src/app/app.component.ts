import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CONFIGURATION_VIEW, ENV_LIST_VIEW} from "./app.routes";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  icon: string = "toggles";

  constructor(private _router: Router) {
  }

  displayConfiguration() {
    if(this._router.url.endsWith(CONFIGURATION_VIEW)) {
      this.icon = "toggles";
      this._router.navigate([ENV_LIST_VIEW]);
    } else {
      this._router.navigate([CONFIGURATION_VIEW]);
      this.icon = "x-lg";
    }
  }

}
