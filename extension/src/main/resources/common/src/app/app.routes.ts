import { Routes } from '@angular/router';
import {LoaderViewComponent} from "./modules/loader/components/loader-view/loader-view.component";
import {EnvViewComponent} from "./modules/env-list/components/env-view/env-view.component";
import { ReleaseNoteViewComponent } from "./modules/release-note/components/release-note-view/release-note-view.component";
import {ConfViewComponent} from "./modules/configuration/components/conf-view/conf-view.component";

export const ENV_VIEW = "environments";
export const RELEASE_NOTE_VIEW = "release-note";
export const CONFIGURATION_VIEW = "configuration";
export const LOADER_VIEW = "loader";

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: LOADER_VIEW
  },
  {
    path: LOADER_VIEW,
    pathMatch: 'full',
    component: LoaderViewComponent
  },
  {
    path: ENV_VIEW,
    pathMatch: 'full',
    component: EnvViewComponent
  },
  {
    path: RELEASE_NOTE_VIEW,
    pathMatch: 'full',
    component: ReleaseNoteViewComponent
  },
  {
    path: CONFIGURATION_VIEW,
    pathMatch: 'full',
    component: ConfViewComponent
  }
];
