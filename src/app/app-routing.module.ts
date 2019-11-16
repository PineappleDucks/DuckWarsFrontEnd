import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ContactComponent} from './page/contact/contact.component';
import {ChatComponent} from './page/chat/chat.component';
import {HomeComponent} from './page/home/home.component';
import {ChooseComponent} from './page/choose/choose.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

import {NoAuthGuard} from './auth/no-auth.guard';
import {AuthGuard} from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: {animation: 'Layer1', title: 'Startseite'}, canActivate: [AuthGuard]},
  { path: 'chat', component: ContactComponent, data: {animation: 'Layer2', title: 'Chats'}, canActivate: [AuthGuard]},
  { path: 'chat/:name', component: ChatComponent, data: {animation: 'Layer3', title: 'Chat :name'}, canActivate: [AuthGuard]},
  { path: 'choose', component: ChooseComponent, data: {animation: 'Layer2', title: 'Szenario'}, canActivate: [AuthGuard]},
  { path: 'login', pathMatch: 'full', component: LoginComponent, data: {animation: 'Layer2', title: 'Anmelden'}, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, data: {animation: 'Layer2', title: 'Registrieren'}, canActivate: [NoAuthGuard] },
  { path: 'no-permission', redirectTo: '/login', data: {animation: 'Layer2'} },
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
