import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import { HeaderComponent } from './header/header.component';
import {CoreModule} from './core.module';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChatViewComponent} from './chat/chat-view/chat-view.component';
import {ChatInputComponent} from './chat/chat-input/chat-input.component';
import {ContactComponent} from './contact/contact.component';
import {ContactEntryComponent} from './contact/contact-entry/contact-entry.component';
import {ContactViewComponent} from './contact/contact-view/contact-view.component';
import {AppRoutingModule} from './app-routing.module';
import {ChatLoadingComponent} from './chat/chat-loading/chat-loading.component';
import {CreditsComponent} from './credits/credits.component';
import {ChoseSideComponent} from './chose-side/chose-side.component';

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
    CreditsComponent,
    ChoseSideComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
