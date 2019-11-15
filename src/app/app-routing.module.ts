import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './page/contact/contact.component';
import {ChatComponent} from './page/chat/chat.component';
import {HomeComponent} from './page/home/home.component';
import {ChooseComponent} from './page/choose/choose.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: {animation: 'Layer1'}},
  { path: 'chat', component: ContactComponent, data: {animation: 'Layer2'}},
  { path: 'chat/:name', component: ChatComponent, data: {animation: 'Layer3'}},
  { path: 'choose', component: ChooseComponent, data: {animation: 'Layer2'}},
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
