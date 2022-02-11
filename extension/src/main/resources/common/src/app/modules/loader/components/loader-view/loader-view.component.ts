import { Component } from '@angular/core';
import {DataBusService} from "../../../../services/data-bus.service";

@Component({
  selector: 'loader-view',
  templateUrl: './loader-view.component.html',
  styleUrls: ['./loader-view.component.css']
})
export class LoaderViewComponent {

  constructor(private _dataBusService: DataBusService) {
    this._dataBusService.confBtnIcon.next("");
  }
}
