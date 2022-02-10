import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../services/message.service";
import {ENV_VIEW, MESSAGE_VIEW} from "../../../app.routes";

export class MessageViewContent {
  title: string = "";
  message: string = "";
  btnTitle: string = "Continue";
  type: string = "info";
  redirect: boolean = false;
  goto: string = ENV_VIEW;
  pict: string = "";
}

@Component({
  selector: 'message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {
  data: MessageViewContent = new MessageViewContent();

  constructor(private _messageService: MessageService) { }

  ngOnInit(): void {
    this.data = this._messageService.pop(MESSAGE_VIEW);
  }

}
