import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CONFIGURATION_VIEW, ENV_VIEW, LOADER_VIEW, MESSAGE_VIEW} from "./app.routes";
import {ConfigurationService} from "./services/configuration.service";
import {EnvironmentsService} from "./services/environments.service";
import {DOCUMENT} from "@angular/common";
import {AwsRoleSwitcherService} from "./services/aws-role-switcher.service";
import {MessageService} from "./services/message.service";
import {MessageViewContent} from "./modules/message/message-view/message-view.component";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  icon: string = "toggles";

  constructor(private _router: Router,
              private _configurationService: ConfigurationService,
              private _environmentsService: EnvironmentsService,
              private _awsRoleSwitcherService: AwsRoleSwitcherService,
              private _messageService: MessageService,
              @Inject(DOCUMENT) private _document: Document) {
  }

  ngOnInit(): void {
    this._configurationService.loadConfiguration(() => {

      if (this._configurationService.configuration.config.options.darkTheme) {
        this._document.body.classList.add('theme-dark');
        this._document.body.classList.remove('theme-light');
      } else {
        this._document.body.classList.add('theme-light');
        this._document.body.classList.remove('theme-dark');
      }

      if(!this._configurationService.configuration.config.confURL ||
        this._configurationService.configuration.config.confURL=== "" ||
        this._configurationService.configuration.config.confURL.indexOf("https://") < 0) {
        let messageViewContent = new MessageViewContent();
        messageViewContent.title = "<strong>Welcome</strong> and thanks to use Odigo environment linker !";
        messageViewContent.pict = "assets/images/bot.png";
        messageViewContent.message = "To begin, you have to provide the configuration URL.";
        messageViewContent.btnTitle = "Configure now";
        messageViewContent.type = "light";
        messageViewContent.redirect = true;
        messageViewContent.goto = "/" + CONFIGURATION_VIEW;
        this._messageService.put(MESSAGE_VIEW, messageViewContent);
        this._router.navigate([MESSAGE_VIEW]);
        return;
      }

      this._awsRoleSwitcherService.initializeSwitcher();

      let validation = this._configurationService.validateConfigURL(this._configurationService.configuration.config.confURL);
      if (validation.hasError) {
        let messageViewContent = new MessageViewContent();
        messageViewContent.title = "<i class=\"bi bi-emoji-frown-fill\"></i> Oups, something went wrong...";
        messageViewContent.message = validation.message;
        messageViewContent.btnTitle = "Check configuration";
        messageViewContent.type = "danger";
        messageViewContent.redirect = true;
        messageViewContent.goto = "/" + CONFIGURATION_VIEW;
        this._messageService.put(MESSAGE_VIEW, messageViewContent);
        this._router.navigate([MESSAGE_VIEW]);
        return;
      } else {
        this.loadEns();
      }
    });
  }

  goToConfiguration() {
    if (this._router.url.endsWith(CONFIGURATION_VIEW)) {
      this.icon = "toggles";
      this._router.navigate([LOADER_VIEW]);
      this.loadEns();
    } else {
      this._router.navigate([CONFIGURATION_VIEW]);
      this.icon = "x-lg";
    }
  }

  loadEns() {
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
      this._messageService.put(MESSAGE_VIEW, messageViewContent);
      this._router.navigate([MESSAGE_VIEW]);
      return;
    }

    this._configurationService.loadEnvironments().subscribe(
      response => {
        if(response.body) {
          this._environmentsService.environments = response.body;
        }
        this._router.navigate([ENV_VIEW]);
      },
      error => {
        let messageViewContent = new MessageViewContent();
        messageViewContent.title = "<i class=\"bi bi-emoji-frown-fill\"></i> Oups, something went wrong...";
        messageViewContent.message = "Please check your configuration URL or VPN connection.";
        messageViewContent.btnTitle = "Check configuration URL";
        messageViewContent.type = "danger";
        messageViewContent.redirect = true;
        messageViewContent.goto = "/" + CONFIGURATION_VIEW;
        this._messageService.put(MESSAGE_VIEW, messageViewContent);
        console.log(error);
        this._router.navigate([MESSAGE_VIEW]);
      });
  }
}
