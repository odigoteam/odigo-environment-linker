import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CONFIGURATION_VIEW, ENV_VIEW, MESSAGE_VIEW} from "../../../../app.routes";
import packageJson from "../../../../../../package.json";
import {DataBusService} from "../../../../services/data-bus.service";
import {ConfigurationService} from "../../../../services/configuration.service";
import {environment} from "../../../../../environments/environment";
import {MessageViewContent} from "../../../message/message-view/message-view.component";
import {EnvironmentsService} from "../../../../services/environments.service";

@Component({
  selector: 'release-note-view',
  templateUrl: './release-note-view.component.html',
  styleUrls: ['./release-note-view.component.css']
})
export class ReleaseNoteViewComponent {
  public appVersion: string = packageJson.version;
  public content: any = environment.releaseNote;

  constructor(private _router: Router,
              private _dataBusService : DataBusService,
              private _configurationService: ConfigurationService,
              private _environmentsService: EnvironmentsService) {
    this._dataBusService.confBtnIcon.next("");
  }

  close(): void {
    this._configurationService.configuration.config.latestExtensionVersionUsed = this._configurationService.configuration.currentExtensionVersion;
    this._configurationService.save();
    if(!this._configurationService.configuration.config.confURL ||
      this._configurationService.configuration.config.confURL=== "" ||
      this._configurationService.configuration.config.confURL.indexOf("https://") < 0) {
      let messageViewContent = new MessageViewContent();
      messageViewContent.title = "<strong>Welcome</strong> and thanks to use Odigo environment linker !";
      messageViewContent.pict = "assets/images/bot.png";
      messageViewContent.message = "To use this extension, you have to provide the configuration URL.";
      messageViewContent.btnTitle = "Configure now";
      messageViewContent.type = "light";
      messageViewContent.redirect = true;
      messageViewContent.goto = "/" + CONFIGURATION_VIEW;
      this._dataBusService.put(MESSAGE_VIEW, messageViewContent);
      this._router.navigate([MESSAGE_VIEW]);
      return;
    }

    this._configurationService.loadEnvironments().subscribe({
      next: (response) => {
        if(response.body) {
          this._environmentsService.environments = response.body;
        }
        this._router.navigate([ENV_VIEW]);
      },
      error: (error) => {
        let messageViewContent = new MessageViewContent();
        messageViewContent.type = "danger";
        if(error.status === 404) {
          messageViewContent.pict = "assets/images/404.png";
          messageViewContent.title = "404 ?! Hum, that's not the configuration link...";
          messageViewContent.message = "Something is missing in your configuration URL, but I don't know what...<br/><br/>Can you check it please for me ?";
          messageViewContent.btnTitle = "Check configuration URL";
          messageViewContent.redirect = true;
          messageViewContent.goto = "/" + CONFIGURATION_VIEW;
        } else {
          messageViewContent.pict = "assets/images/no-vpn.png";
          messageViewContent.title = "Damn... Where is it ?";
          messageViewContent.message = "Your VPN seems gone away. Can you help me find it !?<br/><br/>Please check your VPN connectivity.";
        }
        this._dataBusService.put(MESSAGE_VIEW, messageViewContent);
        console.error(error);
        this._router.navigate([MESSAGE_VIEW]);
      }});
  }

}
