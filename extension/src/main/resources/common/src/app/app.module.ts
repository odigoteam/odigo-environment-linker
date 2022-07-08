import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {BrowserService} from "./services/browser.service";
import {ConfigurationModule} from "./modules/configuration/configuration.module";
import {HttpClientModule} from "@angular/common/http";
import {EnvListModule} from "./modules/env-list/env-list.module";
import {LoaderModule} from "./modules/loader/loader.module";
import {ReleaseNoteModule} from "./modules/release-note/release-note.module";
import { MessageViewComponent } from './modules/message/message-view/message-view.component';
import { AboutViewComponent } from './modules/about/about-view/about-view.component';
import {MotionViewComponent} from "./modules/motion/motion-view/motion-view.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MessageViewComponent,
    AboutViewComponent,
    MotionViewComponent
  ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        ConfigurationModule,
        EnvListModule,
        LoaderModule,
        ReleaseNoteModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [BrowserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
