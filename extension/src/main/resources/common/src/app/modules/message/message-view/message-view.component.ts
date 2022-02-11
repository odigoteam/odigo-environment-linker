import { Component } from '@angular/core';
import {DataBusService} from "../../../services/data-bus.service";
import {ENV_VIEW, MESSAGE_VIEW} from "../../../app.routes";

export class MessageViewContent {
  title: string = "";
  message: string = "";
  btnTitle: string = "Continue";
  type: string = "info";
  redirect: boolean = false;
  pict: string = "";
  goto: string = ENV_VIEW;
}

@Component({
  selector: 'message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent {
  data: MessageViewContent = new MessageViewContent();

  constructor(private _dataBusService: DataBusService) {
    this.data = this._dataBusService.pop(MESSAGE_VIEW);
    this._dataBusService.confBtnIcon.next("");
  }
}
