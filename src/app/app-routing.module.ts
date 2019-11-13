import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {ChatComponent} from './chat/chat.component';
import {CreditsComponent} from './credits/credits.component';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactComponent, pathMatch: 'full'}, // , data: {animation: 'Contacts'}
  { path: 'contacts/:name', component: ChatComponent}, // , data: {animation: 'Chat'}
  { path: 'credits', component: CreditsComponent},
  { path: '**', redirectTo: '/contacts' } // , data: {animation: 'Chat'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false, preloadingStrategy: PreloadAllModules } ) // default
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
