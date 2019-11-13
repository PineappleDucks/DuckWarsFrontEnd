import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './page/contact/contact.component';
import {ChatComponent} from './page/chat/chat.component';
import {HomeComponent} from './page/home/home.component';
import {ChooseComponent} from './page/choose/choose.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: {animation: 'Left-to-Right'}},
  { path: 'chat', component: ContactComponent, data: {animation: 'Left-to-Right'}},
  { path: 'chat/:name', component: ChatComponent, data: {animation: 'Right-to-Left'}},
  { path: 'choose', component: ChooseComponent, data: {animation: 'Left-to-Right'}},
  { path: '**', redirectTo: '/', data: {animation: 'Right-to-Left'} }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false, preloadingStrategy: PreloadAllModules } ) // default
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
