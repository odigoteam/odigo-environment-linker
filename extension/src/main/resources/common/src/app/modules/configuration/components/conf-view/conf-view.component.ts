import {Component, Inject} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {DOCUMENT} from "@angular/common";
import {DataBusService} from "../../../../services/data-bus.service";

@Component({
  selector: 'conf-view',
  templateUrl: './conf-view.component.html',
  styleUrls: ['./conf-view.component.css']
})
export class ConfViewComponent {
  activeTab: string = "appearance";

  constructor(private _configurationService: ConfigurationService,
              private _dataBusService: DataBusService,
              @Inject(DOCUMENT) private _document: Document) {
    this._dataBusService.confBtnIcon.next("save");
    this._dataBusService.confBtnDisabled.next(false);
  }

  navTab(tabName: string) {
    this.activeTab = tabName;
  }
}
