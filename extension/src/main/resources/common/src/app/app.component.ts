import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ABOUT_VIEW, CONFIGURATION_VIEW, ENV_VIEW, LOADER_VIEW, MESSAGE_VIEW, RELEASE_NOTE_VIEW} from "./app.routes";
import {ConfigurationService} from "./services/configuration.service";
import {EnvironmentsService} from "./services/environments.service";
import {DOCUMENT} from "@angular/common";
import {AwsRoleSwitcherService} from "./services/aws-role-switcher.service";
import {DataBusService} from "./services/data-bus.service";
import {MessageViewContent} from "./modules/message/message-view/message-view.component";
import {messages} from "../environments/messages";
import {CustomLinksService} from "./services/custom-links.service";
import {DataMigrationService} from "./services/data-migration.service";

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
              private _customLinksService: CustomLinksService,
              private _environmentsService: EnvironmentsService,
              private _awsRoleSwitcherService: AwsRoleSwitcherService,
              private _dataBusService: DataBusService,
              private _dataMigrationService: DataMigrationService,
              @Inject(DOCUMENT) private _document: Document) {
    _dataBusService.confBtnIcon.subscribe(value => this.icon = value);
    _dataBusService.confBtnDisabled.subscribe(value => this.confButtonDisabled = value);
  }

  ngOnInit(): void {
    this._dataMigrationService.migrateModel(() => {
      this._configurationService.loadConfiguration((configurationLoaded: boolean) => {
        this._customLinksService.load((customLinksLoaded: boolean) => {
          if(!customLinksLoaded) {
            console.log("No custom links loaded from storage.");
          }
        });
        if (this._configurationService.configuration.config.userOptions.darkTheme) {
          this._document.body.classList.add('theme-dark');
          this._document.body.classList.remove('theme-light');
        } else {
          this._document.body.classList.add('theme-light');
          this._document.body.classList.remove('theme-dark');
        }

        if(!configurationLoaded) {
          this._dataBusService.put(MESSAGE_VIEW, this.buildFirstUsageMessage());
          this._router.navigate([MESSAGE_VIEW]).then(_ => {});
          return;
        }

        this._awsRoleSwitcherService.initializeSwitcher();

        this._configurationService.checkVPNConnection().subscribe(
          next => {
            this._configurationService.validateConfigURL(this._configurationService.configuration.config.extensionConfiguration.confURL).subscribe(
              next => {
                if (next.hasError) {
                  this._dataBusService.put(MESSAGE_VIEW, this.buildWrongConfUrlMessage(next.message));
                  this._router.navigate([MESSAGE_VIEW]).then(_ => {});
                  return;
                }

                if(!this._configurationService.configuration.config.extensionConfiguration.latestExtensionVersionUsed ||
                  this._configurationService.configuration.config.extensionConfiguration.latestExtensionVersionUsed !== this._configurationService.configuration.currentExtensionVersion) {
                  this._router.navigate([RELEASE_NOTE_VIEW]).then(_ => {});
                  return;
                }

                this.loadEnvs();
              },
              error => {
                if (error.hasError) {
                  this._dataBusService.put(MESSAGE_VIEW, this.buildWrongConfUrlMessage(error.message));
                  this._router.navigate([MESSAGE_VIEW]).then(_ => {});
                  return;
                }
              });
          },
          error => {
            if (error.hasError) {
              this._dataBusService.put(MESSAGE_VIEW, this.buildVPNMessage());
              this._router.navigate([MESSAGE_VIEW]).then(_ => {});
              return;
            }

            if(!this._configurationService.configuration.config.extensionConfiguration.latestExtensionVersionUsed ||
              this._configurationService.configuration.config.extensionConfiguration.latestExtensionVersionUsed !== this._configurationService.configuration.currentExtensionVersion) {
              this._router.navigate([RELEASE_NOTE_VIEW]).then(_ => {});
              return;
            }

            this.loadEnvs();
          }
        )
      });
    });
  }

  goToAbout() {
    this._dataBusService.confBtnIcon.next(CONFIGURATION_VIEW);
    if (this._router.url !== "/" + ABOUT_VIEW) {
      this._dataBusService.put(ABOUT_VIEW, this._router.url);
      this._router.navigate([ABOUT_VIEW]).then(_ => {});
    } else {
      let route = this._dataBusService.pop(ABOUT_VIEW);
      if(route) {
        this._router.navigateByUrl(route).then(_ => {});
      } else {
        this._router.navigateByUrl(ENV_VIEW).then(_ => {});
      }
    }
  }

  goToConfiguration() {
    this._router.navigate([LOADER_VIEW]).then(_ => {});
    this._dataBusService.confBtnIcon.next("");
    if (this._router.url.indexOf(CONFIGURATION_VIEW) >= 0) {
      this.loadEnvs();
    } else {
      this._router.navigate([CONFIGURATION_VIEW]).then(_ => {});
    }
  }

  loadEnvs() {
    if (!this._configurationService.configuration.config.extensionConfiguration.confURL ||
      this._configurationService.configuration.config.extensionConfiguration.confURL === "") {
      this._dataBusService.put(MESSAGE_VIEW, this.buildFirstUsageMessage());
      this._router.navigate([MESSAGE_VIEW]).then(_ => {});
      return;
    }

    this._configurationService.loadEnvironments().subscribe({
      next: (response) => {
        if(response.body) {
          this._environmentsService.environments = response.body;
        }
        this._router.navigate([ENV_VIEW]).then(_ => {});
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
        this._router.navigate([MESSAGE_VIEW]).then(_ => {});
      }});
  }

  buildNotFoundConfUrlMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "danger";
    message.pict = "assets/images/404.png";
    message.title = messages.confUrl.http404.title;
    message.message = messages.confUrl.http404.text;
    message.btnTitle = messages.confUrl.http404.button;
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildGetConfGenericMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "danger";
    message.pict = "assets/images/404.png";
    message.title = messages.generic.title;
    message.message = messages.generic.text;
    message.btnTitle = messages.generic.button;
    message.size = "large";
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildWrongConfUrlMessage(text: string): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "danger";
    message.title = messages.confUrl.wrongUrl.title;
    message.pict = "assets/images/404.png";
    message.message = text;
    message.btnTitle = messages.confUrl.wrongUrl.button;
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildFirstUsageMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.title = messages.welcome.title;
    message.pict = "assets/images/bot.png";
    message.message = messages.welcome.text;
    message.btnTitle = messages.welcome.button;
    message.type = "light";
    message.redirect = true;
    message.goto = "/" + CONFIGURATION_VIEW;
    return message;
  }

  buildVPNMessage(): MessageViewContent {
    let message = new MessageViewContent();
    message.type = "warning";
    message.pict = "assets/images/no-vpn.png";
    message.title = messages.vpn.title;
    message.message = messages.vpn.text;
    return message;
  }
}
