import { Injectable } from '@angular/core';
import {ContactService} from './contact.service';
import {ActionsService} from './actions.service';
import {MessageService} from './message.service';
import {NotificationService} from './notification.service';
import {LoadingIndicatorService} from './loading-indicator.service';
import {GameHttpService} from './game-http.service';
import {Message} from '../model/Message';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private contactService: ContactService,
              private actionService: ActionsService,
              private messageService: MessageService,
              private notificationService: NotificationService,
              private loadingIndicatorService: LoadingIndicatorService,
              private gameHttpService: GameHttpService,
              private authService: AuthService) { }

  // get current game state
  init() {

    this.authService.user.subscribe( user => {
      if (user && user.token)  {
        this.initSetup();
      }
    });
  }

  chooseScenario(side: string) {


  }

  // load the side and default stuff / saved game state
  initSetup() {
    this.gameHttpService.init().subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  messageRoute(message: Message) {
    this.gameHttpService.message(message).subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
