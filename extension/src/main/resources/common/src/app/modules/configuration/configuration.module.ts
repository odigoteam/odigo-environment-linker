import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfViewComponent} from './components/conf-view/conf-view.component';
import {StorageService} from "../../services/storage.service";
import {FormsModule} from "@angular/forms";
import { GeneralComponent } from './components/general/general.component';
import { BehaviourComponent } from './components/behaviour/behaviour.component';
import { AppearanceComponent } from './components/appearance/appearance.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ConfViewComponent,
    GeneralComponent,
    BehaviourComponent,
    AppearanceComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
  providers: [StorageService],
})
export class ConfigurationModule {
}
