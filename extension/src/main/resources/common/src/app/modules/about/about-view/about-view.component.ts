import { Component, OnInit } from '@angular/core';
import packageJson from "../../../../../package.json";

@Component({
  selector: 'about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent implements OnInit {
  public appVersion: string = packageJson.version;
  public angularVersion: string = packageJson.dependencies["@angular/core"];
  public bootstrapVersion: string = packageJson.dependencies["bootstrap"];

  constructor() {

  }

  ngOnInit(): void {
  }

}
