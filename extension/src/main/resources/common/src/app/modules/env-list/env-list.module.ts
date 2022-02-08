import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {EnvViewComponent} from "./components/env-view/env-view.component";
import { EnvListComponent } from './components/env-list/env-list.component';

@NgModule({
  declarations: [
    EnvViewComponent,
    EnvListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EnvListModule { }
