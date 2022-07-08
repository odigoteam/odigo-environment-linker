import { Routes } from '@angular/router';
import {LoaderViewComponent} from "./modules/loader/components/loader-view/loader-view.component";
import {EnvViewComponent} from "./modules/env-list/components/env-view/env-view.component";
import { ReleaseNoteViewComponent } from "./modules/release-note/components/release-note-view/release-note-view.component";
import {ConfViewComponent} from "./modules/configuration/components/conf-view/conf-view.component";
import {MessageViewComponent} from "./modules/message/message-view/message-view.component";
import {AboutViewComponent} from "./modules/about/about-view/about-view.component";
import {MotionViewComponent} from "./modules/motion/motion-view/motion-view.component";
import {BehaviourComponent} from "./modules/configuration/components/behaviour/behaviour.component";
import {GeneralComponent} from "./modules/configuration/components/general/general.component";
import {AppearanceComponent} from "./modules/configuration/components/appearance/appearance.component";
import {CustomLinksComponent} from "./modules/configuration/components/custom-links/custom-links.component";

export const ENV_VIEW = "environments";
export const RELEASE_NOTE_VIEW = "release-note";
export const CONFIGURATION_VIEW = "configuration";
export const CONFIGURATION_TAB_APPEARANCE = "appearance";
export const CONFIGURATION_TAB_BEHAVIOUR = "behaviour";
export const CONFIGURATION_TAB_CUSTOM_LINKS = "custom-links";
export const CONFIGURATION_TAB_GENERAL = "general";
export const LOADER_VIEW = "loader";
export const MESSAGE_VIEW = "message";
export const ABOUT_VIEW = "about";
export const MOTION_VIEW = "motion";

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
    component: ConfViewComponent,
    children: [
      { path: "", redirectTo: CONFIGURATION_TAB_APPEARANCE, pathMatch: "full"},
      { path: CONFIGURATION_TAB_GENERAL, component: GeneralComponent },
      { path: CONFIGURATION_TAB_BEHAVIOUR, component: BehaviourComponent },
      { path: CONFIGURATION_TAB_APPEARANCE, component: AppearanceComponent },
      { path: CONFIGURATION_TAB_CUSTOM_LINKS, component: CustomLinksComponent }
    ]
  },
  {
    path: MESSAGE_VIEW,
    pathMatch: 'full',
    component: MessageViewComponent
  },
  {
    path: ABOUT_VIEW,
    pathMatch: 'full',
    component: AboutViewComponent
  },
  {
    path: MOTION_VIEW,
    pathMatch: 'full',
    component: MotionViewComponent
  }
];
