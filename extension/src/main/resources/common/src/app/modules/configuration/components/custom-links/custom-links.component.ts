import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {CustomLink} from "../../../../models/custom-link.class";
import {isPlatformBrowser} from "@angular/common";
import {CustomLinksService} from "../../../../services/custom-links.service";

@Component({
  selector: 'app-custom-links',
  templateUrl: './custom-links.component.html',
  styleUrls: ['../conf-view/conf-view.component.css', './custom-links.component.css']
})
export class CustomLinksComponent {
  @ViewChild('currentLinkTitle') currentLinkTitle: ElementRef | undefined;
  currentLink: CustomLink | undefined = undefined;
  links: CustomLink[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _customLinksServices: CustomLinksService) {
    if(this._customLinksServices.customLinks) {
      this.links = this._customLinksServices.customLinks;
    }
  }

  changeIcon($event: string) {
    if(this.currentLink) {
      this.currentLink.icon = $event;
      this.saveChanges();
    }
  }

  addNewLink() {
    this.links.unshift(new CustomLink());
    this.currentLink = this.links[0];
    if (isPlatformBrowser(this.platformId)) {
      this.currentLinkTitle?.nativeElement.focus();
    }
  }

  edit(index: number) {
    this.currentLink = this.links[index];
    if (isPlatformBrowser(this.platformId)) {
      this.currentLinkTitle?.nativeElement.focus();
    }
  }

  delete(index: number) {
    if(this.currentLink === this.links[index]) {
      this.currentLink = undefined;
    }
    this.links.splice(index, 1);
    this.saveChanges();
  }

  saveChanges() {
    this._customLinksServices.save();
  }
}
