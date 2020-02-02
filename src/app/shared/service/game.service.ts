import { Injectable} from '@angular/core';
import {NotificationService} from './notification.service';
import {LoadingIndicatorService} from './loading-indicator.service';
import {GameHttpService} from './game-http.service';
import {AuthService} from '../../auth/auth.service';

import {BehaviorSubject} from 'rxjs';
import {Init} from '../model/Init';
import {DialogOption} from '../model/DialogOption';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private notificationService: NotificationService,
              private loadingIndicatorService: LoadingIndicatorService,
              private gameHttpService: GameHttpService,
              private authService: AuthService) { }

  private data: Init;
  private activeSide = false;

  dataChanges = new BehaviorSubject<Init>(this.data);

  // get current game state
  init() {
    this.authService.user.subscribe( user => {
      if (user && user.token)  {
        this.initSetup();
      }
    });
  }

  chooseScenario(side: string) {
    this.activeSide = side === 'jedi';
    this.dataChanges.next(this.data);
  }

  // load the side and default stuff / saved game state
  initSetup() {
    this.gameHttpService.init().subscribe( (data: Init) => {
      this.data = data;
      this.dataChanges.next(this.data);
    }, error => {
      console.log(error);
    });
  }

  messageRoute(dialogOption: DialogOption) {
    this.gameHttpService.message(dialogOption).subscribe( data => {
      console.log(data);

      const chat = this.data.chats.find(element => element.contact.firstName = data.author.firstName);

      // todo Verzögerung ...

      chat.messageList.push(data);
    }, error => {
      console.log(error);
    });
  }

  getChats() {
    return this.data.chats.filter( element => element.jediSide === this.activeSide);
  }

  getChat(chatId: number) {
    return this.data.chats.find(element => element.chatId === chatId);
  }
}
