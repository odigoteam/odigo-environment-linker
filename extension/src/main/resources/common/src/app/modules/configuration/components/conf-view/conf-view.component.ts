import { Component, OnInit } from '@angular/core';
import packageJson from '../../../../../../package.json';

@Component({
  selector: 'conf-view',
  templateUrl: './conf-view.component.html',
  styleUrls: ['./conf-view.component.css']
})
export class ConfViewComponent implements OnInit {
  public appVersion: string = packageJson.version;

  constructor() { }

  ngOnInit(): void {
  }

}
