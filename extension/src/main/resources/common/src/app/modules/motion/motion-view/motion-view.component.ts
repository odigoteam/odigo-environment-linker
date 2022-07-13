import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {BrowserService} from "../../../services/browser.service";
import {Router} from "@angular/router";
import {
  ENV_VIEW,
} from "../../../app.routes";
import {ConfigurationService} from "../../../services/configuration.service";
import {UserConfiguration} from "../../../models/settings.class";
import {MotionService} from "../../../services/motion.service";
import {MotionPlanning} from "../../../models/motion.class";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'motion-view',
  templateUrl: './motion-view.component.html',
  styleUrls: ['./motion-view.component.css']
})
export class MotionViewComponent implements AfterViewInit {
  userConf: UserConfiguration = new UserConfiguration();
  motionPlanning: MotionPlanning | undefined;
  // @ts-ignore
  @ViewChild('waveList') divToScroll: ElementRef;
  @ViewChild('searchField') searchField: ElementRef | undefined;
  trimMoveNameSize : number = 45;

  constructor(private _configurationService: ConfigurationService,
              private _router: Router,
              private _browser: BrowserService,
              private _motionService: MotionService,
              @Inject(DOCUMENT) private document:Document) {
    this.userConf = this._configurationService.configuration.userConfiguration;
    this.motionPlanning = _motionService.motionPlanning;
  }

  ngAfterViewInit(): void {
    this.searchField?.nativeElement.focus();
    if(this._configurationService.configuration.userConfiguration.extensionConfiguration.motionSearch.length < 1) {
      const elem = this.document.getElementsByClassName('accordion-collapse collapse show');
      const container = this.document.getElementsByClassName('accordion');

      if(elem && elem.length > 0) {
        // @ts-ignore
        this.divToScroll.nativeElement.scrollTop = elem?.item(0)?.getBoundingClientRect().top - container?.item(0)?.getBoundingClientRect().top;
      }
    }
    this.updateResults();
  }

  ngOnInit(): void {
  }

  // close motion view after setting search field
  goToEnvList(envId : string ) {
    this.userConf.extensionConfiguration.search = envId;
    this._configurationService.saveConfiguration();
    this._router.navigate([ENV_VIEW]).then(_ => {});
  }

  // open link in a new tab and close extension
  openLink(url: string) {
    if(url) {
        this._browser.tabs.create({url});
      }
    window.close();
  }

  updateResults() {
    if(this._configurationService.configuration.userConfiguration.extensionConfiguration.motionSearch.length >= 1) {
      this.divToScroll.nativeElement.scrollTop = 0;
    }
    this._motionService.runSearch();
    this._configurationService.saveExtensionConfiguration();
  }

  clearSearch() {
    this.userConf.extensionConfiguration.motionSearch = "";
    this.updateResults();
    setTimeout(() => {
      const elem = this.document.getElementsByClassName('accordion-collapse collapse show');
      const container = this.document.getElementsByClassName('accordion');
      if(elem && elem.length > 0) {
        // @ts-ignore
        this.divToScroll.nativeElement.scrollTop = elem?.item(0)?.getBoundingClientRect().top - container?.item(0)?.getBoundingClientRect().top;
      }
    }, 100);
  }
}
