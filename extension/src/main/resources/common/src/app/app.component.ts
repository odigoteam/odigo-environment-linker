import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ABOUT_VIEW, CONFIGURATION_VIEW, ENV_VIEW, LOADER_VIEW, MESSAGE_VIEW, RELEASE_NOTE_VIEW} from "./app.routes";
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
  icon: string = "configuration";
  confButtonDisabled: boolean = false;

  constructor(private _router: Router,
              private _configurationService: ConfigurationService,
              private _environmentsService: EnvironmentsService,
              private _awsRoleSwitcherService: AwsRoleSwitcherService,
              private _dataBusService: DataBusService,
              @Inject(DOCUMENT) private _document: Document) {
    _dataBusService.confBtnIcon.subscribe(value => this.icon = value);
    _dataBusService.confBtnDisabled.subscribe(value => this.confButtonDisabled = value);
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
        this._dataBusService.put(MESSAGE_VIEW, this.buildFirstUsageMessage());
        this._router.navigate([MESSAGE_VIEW]);
        return;
      }

      this._awsRoleSwitcherService.initializeSwitcher();

      this._configurationService.validateConfigURL(this._configurationService.configuration.config.confURL).subscribe(
        next => {
          if (next.hasError) {
            this._dataBusService.put(MESSAGE_VIEW, this.buildWrongConfUrlMessage(next.message));
            this._router.navigate([MESSAGE_VIEW]);
            return;
          }

          if(!this._configurationService.configuration.config.latestExtensionVersionUsed ||
            this._configurationService.configuration.config.latestExtensionVersionUsed !== this._configurationService.configuration.currentExtensionVersion) {
            this._router.navigate([RELEASE_NOTE_VIEW]);
            return;
          }

          this.loadEnvs();
        },
        error => {
          if (error.hasError) {
            this._dataBusService.put(MESSAGE_VIEW, this.buildWrongConfUrlMessage(error.message));
            this._router.navigate([MESSAGE_VIEW]);
            return;
          }
        });
    });
  }

  goToAbout() {
    this._dataBusService.confBtnIcon.next("configuration");
    if (this._router.url !== "/" + ABOUT_VIEW) {
      this._dataBusService.put(ABOUT_VIEW, this._router.url);
      this._router.navigate([ABOUT_VIEW]);
    } else {
      let route = this._dataBusService.pop(ABOUT_VIEW);
      if(route) {
        this._router.navigateByUrl(route);
      } else {
        this._router.navigateByUrl(ENV_VIEW);
      }
    }
  }

  goToConfiguration() {
    this._router.navigate([LOADER_VIEW]);
    this._dataBusService.confBtnIcon.next("");
    if (this._router.url.endsWith(CONFIGURATION_VIEW)) {
      this.loadEnvs();
    } else {
      this._router.navigate([CONFIGURATION_VIEW]);
    }
  }

  loadEnvs() {
    if (!this._configurationService.configuration.config.confURL ||
      this._configurationService.configuration.config.confURL === "" ||
      this._configurationService.configuration.config.confURL.indexOf("https://") < 0) {
      this._dataBusService.put(MESSAGE_VIEW, this.buildFirstUsageMessage());
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
        let message = new MessageViewContent();
        message.type = "danger";
        if(error.status === 404) {
          this._dataBusService.put(MESSAGE_VIEW, this.buildNotFoundConfUrlMessage());
        } if(error.status === 0) {
          this._dataBusService.put(MESSAGE_VIEW, this.buildVPNMessage());
        } else {
          this._dataBusService.put(MESSAGE_VIEW, this.buildGetConfGenericMessage());
        }
        console.error(error);
        this._router.navigate([MESSAGE_VIEW]);
      }});
  }

  buildNotFoundConfUrlMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "danger";
    message.pict = "assets/images/404.png";
    message.title = "404 ?! Hum, I think I'm lost...";
    message.message = "Something is wrong with the provided configuration URL, but I don't know what...<br/><br/>Can you check it please for me ?";
    message.btnTitle = "Check configuration URL";
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildGetConfGenericMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "danger";
    message.pict = "assets/images/404.png";
    message.title = "It's so close, but so far...";
    message.message = "Something went wrong when I've tried to get the configuration, but I don't know what...<br/><br/>Can you check your <strong>configuration URL</strong> please ?<br/><br/><small><i><u>Tips</u> : You can try to copy past it in your browser, you should land on an awesome incomprehensible JSON page. If not, you have much serious problem...</i></small>";
    message.btnTitle = "Check configuration URL";
    message.size = "large";
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildWrongConfUrlMessage(text: string): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "danger";
    message.title = "Oups, something went wrong...";
    message.pict = "assets/images/bot-error.png";
    message.message = text;
    message.btnTitle = "Check configuration";
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildFirstUsageMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.title = "<strong>Welcome</strong> and thanks to use Odigo environment linker !";
    message.pict = "assets/images/bot.png";
    message.message = "To begin, you have to provide the configuration URL.<br/><br/><small><i><u>Help</u> : if you haven't this URL, you can ask it to L&eacute;vent&eacute; NAGY on Slack, by mail of teams</small>";
    message.btnTitle = "Configure now";
    message.type = "light";
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildVPNMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "warning";
    message.pict = "assets/images/no-vpn.png";
    message.title = "Damn... Where is it ?";
    message.message = "Your VPN seems gone away. Can you help me find it !?<br/><br/>Please check your VPN connectivity.";
    return message;
  }
}
