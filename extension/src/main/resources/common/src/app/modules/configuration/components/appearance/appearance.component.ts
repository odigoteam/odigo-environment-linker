import {Component, Inject, OnInit} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {UserConfiguration} from "../../../../models/settings.class";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.css', "../conf-view/conf-view.component.css"]
})
export class AppearanceComponent implements OnInit {
  userConfiguration: UserConfiguration = new UserConfiguration();

  constructor(private _configurationService: ConfigurationService,
              @Inject(DOCUMENT) private _document: Document) {
    this.userConfiguration = this._configurationService.configuration.userConfiguration;
  }

  ngOnInit(): void {
  }

  saveConfig(): void {
    this._configurationService.saveConfiguration();
  }

  applyTheme() {
    if(this.userConfiguration.userOptions.darkTheme) {
      this._document.body.classList.add('theme-dark');
      this._document.body.classList.remove('theme-light');
    } else {
      this._document.body.classList.add('theme-light');
      this._document.body.classList.remove('theme-dark');
    }
    this.saveConfig();
  }
}
