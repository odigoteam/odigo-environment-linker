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
    title: "More than 200 users !",
    subtitle: "Many thanks to all the people who use and enjoy the Odigo environment linker. Many of you came to thank me directly on the different channels and did not hesitate to offer me features. It is also thanks to them that this little tool became what it is today!</br>" +
      "</br>" +
      "To thank you, I have prepared a little surprise for you. I hid <span class=\"fs-5 fw-bolder text-uppercase\">4 Easter eggs</span> in the tools. To trigger them, nothing could be simpler, you must enter the right keyword(s) in the search bar, starting with the <b>\"/\"</b> character (eg: \"/hello\").</br>" +
      "</br>" +
      "To help you find them, here is an enigm valid for all 4:</br>" +
      "\"You don't have to put your mind upside down to find them or enter the matrix. Have a coffee, and they will reveal themselves to you to finally celebrate the victory!\"",
    features: [
      {
        shortDesc: "Command line notion",
        longDesc: "In the search input, if you start with '/' character, it will be interpreted as a command. For now, the only commands available are those for easter eggs but it's opening a large perspective for amazing features !"
      }
    ],
    changes: [
    ],
    bugfixes: [
      {
        desc: "Fix vulnerabilities"
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
