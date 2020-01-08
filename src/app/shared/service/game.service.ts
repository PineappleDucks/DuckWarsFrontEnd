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
    this.contactService.addContact( {
      display: 'D2R2',
      image: 'assets/images/profile-icon/D2R2.png',
      firstName: 'D2R2',
      lastName: ''
    });

    this.contactService.addContact( {
      display: 'stormtrooper',
      image: 'assets/images/profile-icon/Stormtrooper.png',
      firstName: 'Stormtrooper',
      lastName: ''
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test',
      outgoing: false,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test 2',
      outgoing: true,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test',
      outgoing: false,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test 2',
      outgoing: true,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test',
      outgoing: false,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test 2',
      outgoing: true,
      date: new Date()
    });

    this.actionService.addAction('D2R2', {
      display: 'Action 1',
      value: 'Value 1'
    });
  }

  // initial choose scenario to start the game
  chooseScenario(side: string) {
    this.initSetup(side);
  }

  // load the side and default stuff / saved game state
  initSetup(side: string) {
    this.gameHttpService.init(side).subscribe( data => {

    }, error => {
      console.log(error);
    });
  }

  sendMessage(message: Message) {
    this.gameHttpService.sendMessage(message).subscribe( data => {

    }, error => {
      console.log(error);
    });
  }

  getPossibleResponses(message: Message) {
    this.gameHttpService.getPossibleResponses(message).subscribe( data => {

    }, error => {
      console.log(error);
    });
  }
}
