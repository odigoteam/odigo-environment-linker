import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfViewComponent} from './components/conf-view/conf-view.component';
import {StorageService} from "../../services/storage/storage.service";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ConfViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [StorageService],
})
export class ConfigurationModule {
}
