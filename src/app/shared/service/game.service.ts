import { Injectable } from '@angular/core';
import {ContactService} from './contact.service';
import {ActionsService} from './actions.service';
import {MessageService} from './message.service';
import {NotificationService} from './notification.service';
import {LoadingIndicatorService} from './loading-indicator.service';
import {GameHttpService} from './game-http.service';
import {Message} from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private contactService: ContactService,
              private actionService: ActionsService,
              private messageService: MessageService,
              private notificationService: NotificationService,
              private loadingIndicatorService: LoadingIndicatorService,
              private gameHttpService: GameHttpService) { }

  // get current game state
  init() {

  }


  // initial choose scenario to start the game
  chooseScenario(side: string) {
    this.initSetup(side);
  }

  // load the side and default stuff / saved game state
  initSetup(side: string) {
    this.gameHttpService.init(side).subscribe( data => {
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
