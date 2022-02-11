import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CONFIGURATION_VIEW, ENV_VIEW, LOADER_VIEW, MESSAGE_VIEW, RELEASE_NOTE_VIEW} from "./app.routes";
import {ConfigurationService} from "./services/configuration.service";
import {EnvironmentsService} from "./services/environments.service";
import {DOCUMENT} from "@angular/common";
import {AwsRoleSwitcherService} from "./services/aws-role-switcher.service";
import {DataBusService} from "./services/data-bus.service";
import {MessageViewContent} from "./modules/message/message-view/message-view.component";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  icon: string = "";

  constructor(private _router: Router,
              private _configurationService: ConfigurationService,
              private _environmentsService: EnvironmentsService,
              private _awsRoleSwitcherService: AwsRoleSwitcherService,
              private _dataBusService: DataBusService,
              @Inject(DOCUMENT) private _document: Document) {
    _dataBusService.confBtnIcon.subscribe(value => this.icon = value);
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
        this._dataBusService.put(MESSAGE_VIEW, messageViewContent);
        this._router.navigate([MESSAGE_VIEW]);
        return;
      }

      this._awsRoleSwitcherService.initializeSwitcher();

      let validation = this._configurationService.validateConfigURL(this._configurationService.configuration.config.confURL);
      if (validation.hasError) {
        let messageViewContent = new MessageViewContent();
        messageViewContent.title = "Oups, something went wrong...";
        messageViewContent.pict = "assets/images/bot-error.png";
        messageViewContent.message = validation.message;
        messageViewContent.btnTitle = "Check configuration";
        messageViewContent.type = "danger";
        messageViewContent.redirect = true;
        messageViewContent.goto = "/" + CONFIGURATION_VIEW;
        this._dataBusService.put(MESSAGE_VIEW, messageViewContent);
        this._router.navigate([MESSAGE_VIEW]);
        return;
      }

      if(this._configurationService.configuration.config.latestExtensionVersionUsed ||
        this._configurationService.configuration.config.latestExtensionVersionUsed !== this._configurationService.configuration.currentExtensionVersion) {
        this._router.navigate([RELEASE_NOTE_VIEW]);
        return;
      }

      this.loadEnvs();
    });
  }

  goToConfiguration() {
    this._dataBusService.confBtnIcon.next("");
    if (this._router.url.endsWith(CONFIGURATION_VIEW)) {
      this._router.navigate([LOADER_VIEW]);
      this.loadEnvs();
    } else {
      this._router.navigate([CONFIGURATION_VIEW]);
    }
  }

  loadEnvs() {
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
