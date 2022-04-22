import {Component} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {DataBusService} from "../../../../services/data-bus.service";
import {Router} from "@angular/router";
import {
  CONFIGURATION_TAB_APPEARANCE,
  CONFIGURATION_TAB_BEHAVIOUR,
  CONFIGURATION_TAB_CUSTOM_LINKS, CONFIGURATION_TAB_GENERAL,
  CONFIGURATION_VIEW
} from "../../../../app.routes";

@Component({
  selector: 'conf-view',
  templateUrl: './conf-view.component.html',
  styleUrls: ['./conf-view.component.css']
})
export class ConfViewComponent {
  activeTab: string = CONFIGURATION_TAB_APPEARANCE;

  constructor(private _configurationService: ConfigurationService,
              private _dataBusService: DataBusService,
              private _router: Router) {
    if (this._router.url.indexOf(CONFIGURATION_TAB_APPEARANCE) >= 0) {
      this.activeTab = CONFIGURATION_TAB_APPEARANCE;
    } else if (this._router.url.indexOf(CONFIGURATION_TAB_BEHAVIOUR) >= 0) {
      this.activeTab = CONFIGURATION_TAB_BEHAVIOUR;
    } else if (this._router.url.indexOf(CONFIGURATION_TAB_CUSTOM_LINKS) >= 0) {
      this.activeTab = CONFIGURATION_TAB_CUSTOM_LINKS;
    } else if (this._router.url.indexOf(CONFIGURATION_TAB_GENERAL) >= 0) {
      this.activeTab = CONFIGURATION_TAB_GENERAL;
    }
    this._dataBusService.confBtnIcon.next("save");
    this._dataBusService.confBtnDisabled.next(false);
  }

  navTab(tabName: string) {
    this.activeTab = tabName;
  }
}
