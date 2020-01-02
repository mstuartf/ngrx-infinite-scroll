import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StoreModule } from '@ngrx/store';
import { peopleReducer } from '../state/reducer';
import { HttpClientModule } from '@angular/common/http'

import { HomePage } from '../pages/home/home';
import {EffectsModule} from "@ngrx/effects";
import {PeopleEffects} from "../state/effects";
import {InfiniteScrollDirective} from '../infinite-scroll.directive';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfiniteScrollDirective
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ people: peopleReducer }),
    EffectsModule.forRoot([PeopleEffects]),
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
