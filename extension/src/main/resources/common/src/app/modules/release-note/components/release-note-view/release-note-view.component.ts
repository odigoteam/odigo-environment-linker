import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CONFIGURATION_VIEW, ENV_VIEW, LOADER_VIEW, MESSAGE_VIEW} from "../../../../app.routes";
import packageJson from "../../../../../../package.json";
import {DataBusService} from "../../../../services/data-bus.service";
import {ConfigurationService} from "../../../../services/configuration.service";
import {MessageViewContent} from "../../../message/message-view/message-view.component";
import {EnvironmentsService} from "../../../../services/environments.service";
import {messages} from "../../../../../environments/messages";
import {BrowserService} from "../../../../services/browser.service";

@Component({
  selector: 'release-note-view',
  templateUrl: './release-note-view.component.html',
  styleUrls: ['./release-note-view.component.css']
})
export class ReleaseNoteViewComponent {
  public appVersion: string = packageJson.version;
  public content: any = {
    title: "Happy Spring ! <i class=\"bi bi-flower1\"></i>",
    subtitle: "Bye bye winter, and say hello spring ! Since March 20, the season for the renewal of nature, the return of migratory birds and the awakening of hibernating animals. It is also the season of love among birds and for everyone, a particularly euphoric period. It is well known that the sun acts as a powerful antidepressant and its return therefore helps to lift our spirits!<br/>So, consume sun without moderation ! <i class=\"bi bi-sun-fill\"></i><i class=\"bi bi-emoji-sunglasses\"></i>",
    features: [
      {
        shortDesc: "3 states AWS filter checkbox",
        longDesc: "AWS filter has now 3 states : <ul>" +
          "<li><img src=\"assets/images/checkunchecked.jpg\" alt=\"\"/> Hide AWS environments</li>" +
          "<li><img src=\"assets/images/checkIndeterminate.jpg\" alt=\"\"/> Show AWS + All others environments (mixed)</li>" +
          "<li><img src=\"assets/images/checkchecked.jpg\" alt=\"\"/> Show ONLY AWS environments</li>" +
          "</ul>"
      }
    ],
    changes: [
      {
        shortDesc: "CSS improvement in Appearance tab content",
      },
      {
        shortDesc: "Reorder (alphabetically) the conf tabs",
      }
    ],
    bugfixes: [
      {
        desc: "Fix CX Studio button text"
      },
      {
        desc: "MPA link broken due to incomplete env information"
      }
    ]
  };

  constructor(private _router: Router,
              private _dataBusService: DataBusService,
              private _configurationService: ConfigurationService,
              private _browser: BrowserService,
              private _environmentsService: EnvironmentsService) {
    this._dataBusService.confBtnIcon.next("");
  }

  close(): void {
    this._router.navigate([LOADER_VIEW]);
    this._configurationService.configuration.userConfiguration.extensionConfiguration.latestExtensionVersionUsed = this._configurationService.configuration.currentExtensionVersion;
    this._configurationService.saveConfiguration();
    if (!this._configurationService.configuration.userConfiguration.extensionConfiguration.confURL ||
      this._configurationService.configuration.userConfiguration.extensionConfiguration.confURL === "" ||
      this._configurationService.configuration.userConfiguration.extensionConfiguration.confURL.indexOf("https://") < 0) {
      let messageViewContent = new MessageViewContent();
      messageViewContent.title = messages.welcome.title;
      messageViewContent.pict = "assets/images/bot.png";
      messageViewContent.message = messages.welcome.text;
      messageViewContent.btnTitle = messages.welcome.button;
      messageViewContent.type = "light";
      messageViewContent.redirect = true;
      messageViewContent.goto = "/" + CONFIGURATION_VIEW;
      this._dataBusService.put(MESSAGE_VIEW, messageViewContent);
      this._router.navigate([MESSAGE_VIEW]);
      return;
    }

    this._configurationService.loadEnvironments().subscribe({
      next: (response) => {
        if (response.body) {
          this._environmentsService.environments = response.body;
        }
        this._router.navigate([ENV_VIEW]);
      },
      error: (error) => {
        let messageViewContent = new MessageViewContent();
        messageViewContent.type = "danger";
        if (error.status === 404) {
          messageViewContent.pict = "assets/images/404.png";
          messageViewContent.title = messages.confUrl.http404.title;
          messageViewContent.message = messages.confUrl.http404.text;
          messageViewContent.btnTitle = messages.confUrl.http404.button;
          messageViewContent.redirect = true;
          messageViewContent.goto = "/" + CONFIGURATION_VIEW;
        } else {
          messageViewContent.pict = "assets/images/no-vpn.png";
          messageViewContent.title = messages.vpn.title;
          messageViewContent.message = messages.vpn.text;
        }
        this._dataBusService.put(MESSAGE_VIEW, messageViewContent);
        console.error(error);
        this._router.navigate([MESSAGE_VIEW]);
      }
    });
  }

  openLink(url: string) {
    this._browser.tabs.create({url});
    window.close();
  }
}
