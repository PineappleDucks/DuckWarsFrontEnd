import { Injectable} from '@angular/core';
import {NotificationService} from './notification.service';
import {LoadingIndicatorService} from './loading-indicator.service';
import {GameHttpService} from './game-http.service';
import {AuthService} from '../../auth/auth.service';

import {BehaviorSubject} from 'rxjs';
import {Init} from '../model/Init';
import {DialogOption} from '../model/DialogOption';
import {Message} from '../model/Message';

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

    this.notificationService.resetNotifications();

    if (this.data.chats.length === 2) {
      if (this.activeSide) {
        this.notificationService.addNotification(2);
      } else {
        this.notificationService.addNotification(1);
      }
    }

    this.dataChanges.next(this.data);
  }

  // load the side and default stuff / saved game state
  initSetup() {
    this.gameHttpService.init().subscribe( (data: Init) => {
      this.data = data;

      this.notificationService.resetNotifications();

      if (this.data.chats.length === 2) {
        if (this.activeSide) {
          this.notificationService.addNotification(2);
        } else {
          this.notificationService.addNotification(1);
        }
      }

      this.dataChanges.next(this.data);
    }, error => {
      console.log(error);
    });
  }

  messageRoute(chatId: number, dialogOption: DialogOption) {

    this.data.chats.find(element => element.chatId === chatId).messageList.push({
      messageId: -1,
      text: dialogOption.text,
      date: new Date(),
      dialogOptions: [],
      author: null
    });

    this.gameHttpService.message(chatId, dialogOption).subscribe( data => {
      if (!data) {
        return;
      }

      console.log(data);

      const chat = this.data.chats.find(element => element.contact.id = data.author.id);

      console.log(chat);

      setTimeout( () => {
        console.log('timeout');

        console.log(chat);
        chat.messageList.push(data);
        console.log(chat);

        this.notificationService.addNotification(chatId);

        if (data.dialogOptions) {
          data.dialogOptions.forEach(option => {
            if (option.text === '') {
              this.messageRoute(chatId, option);
            }
          });
        }
        this.dataChanges.next(this.data);
      }, 200 + data.text.length * 36);
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
