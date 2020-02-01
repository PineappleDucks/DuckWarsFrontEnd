import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ContactComponent} from './page/contact/contact.component';
import {ChatComponent} from './page/chat/chat.component';
import {HomeComponent} from './page/home/home.component';
import {ChooseComponent} from './page/choose/choose.component';
import {LandingComponent} from './page/landing/landing.component';

import {AuthGuard} from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: {animation: 'Home', title: ''}},

  { path: 'landing', component: LandingComponent, data: {animation: 'Layer1', title: 'PineApple Wars! Das Game'} },

  { path: 'chat', component: ContactComponent, data: {animation: 'Layer2', title: 'Chats'}, canActivate: [AuthGuard]},
  { path: 'chat/:name', component: ChatComponent, data: {animation: 'Layer3', title: 'Chat :name'}, canActivate: [AuthGuard]},
  { path: 'choose', component: ChooseComponent, data: {animation: 'Layer2', title: 'Szenario'}, canActivate: [AuthGuard]},
  { path: 'no-permission', redirectTo: '/landing', data: {animation: 'Layer2'} },
  { path: '**', redirectTo: '/', data: {animation: 'Layer2'} }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false, preloadingStrategy: PreloadAllModules } ) // default
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
