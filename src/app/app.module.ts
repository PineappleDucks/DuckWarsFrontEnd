import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { ChatComponent } from './page/chat/chat.component';
import { ChatMessageComponent } from './page/chat/chat-message/chat-message.component';
import { HeaderComponent } from './header/header.component';
import {ChatViewComponent} from './page/chat/chat-view/chat-view.component';
import {ChatInputComponent} from './page/chat/chat-input/chat-input.component';
import {ContactComponent} from './page/contact/contact.component';
import {ContactEntryComponent} from './page/contact/contact-entry/contact-entry.component';
import {ContactViewComponent} from './page/contact/contact-view/contact-view.component';
import {ChatLoadingComponent} from './page/chat/chat-loading/chat-loading.component';
import {HomeComponent} from './page/home/home.component';
import {ChooseComponent} from './page/choose/choose.component';
import {MatRippleModule} from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatMessageComponent,
    HeaderComponent,
    ChatViewComponent,
    ChatInputComponent,
    ContactComponent,
    ContactEntryComponent,
    ContactViewComponent,
    ChatLoadingComponent,
    HomeComponent,
    ChooseComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatRippleModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }