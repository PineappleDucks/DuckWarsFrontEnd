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

  loadingChanges = new BehaviorSubject<boolean>(false);

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

    this.dataChanges.next(this.data);
  }

  // load the side and default stuff / saved game state
  initSetup() {
    this.gameHttpService.init().subscribe( (data: Init) => {
      this.data = data;

      this.notificationService.resetNotifications();

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

      console.log('message: ' + JSON.stringify(data));

      let chat = this.data.chats.find(element => element.contact.id === data.author.id);

      console.log('chat: ' + JSON.stringify(chat));

      if (!chat) {
        console.log('create new chat: ' + JSON.stringify({
          chatId: this.getNextFreeId(),
          backgroundId: null,
          jediSide: this.activeSide,
          messageList: [],
          contact: data.author
        }));
        this.data.chats.push( {
          chatId: this.getNextFreeId(),
          backgroundId: null,
          jediSide: this.activeSide,
          messageList: [],
          contact: data.author
        });

        chat = this.data.chats.find(element => element.contact.id === data.author.id);

        this.notificationService.addChat(chat.chatId);
      }

      setTimeout( () => {
        if (chat.chatId === chatId) {
          this.loadingChanges.next(true);
        }
      }, 100);

      setTimeout( () => {
        console.log('timeout');

        chat.messageList.push(data);

        this.loadingChanges.next(false);

        this.notificationService.addNotification(chat.chatId);

        if (data.dialogOptions) {
          data.dialogOptions.forEach(option => {
            if (option.text === '') {
              this.messageRoute(chat.chatId, option);
            }
          });
        }
        this.dataChanges.next(this.data);

        console.log('message added to chat: ' + chat.chatId);
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

  getNextFreeId() {
    let i = 0;

    this.data.chats.forEach( data => {
      i++;
    });

    return i + 1;
  }
}
