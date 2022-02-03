import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ENV_LIST_VIEW} from "../../../../app.routes";
import packageJson from "../../../../../../package.json";

@Component({
  selector: 'release-note-view',
  templateUrl: './release-note-view.component.html',
  styleUrls: ['./release-note-view.component.css']
})
export class ReleaseNoteViewComponent implements OnInit {
  public appVersion: string = packageJson.version;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  close(): void {
    this._router.navigate([ENV_LIST_VIEW]);
  }

}
