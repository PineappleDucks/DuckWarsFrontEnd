import { Injectable } from '@angular/core';
import {Message} from '../model/Message';
import {Subject, Subscription} from 'rxjs';
import {Chat} from '../model/Chat';
import {NotificationService} from './notification.service';
import {ContactService} from './contact.service';
import {LoadingService} from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chat: Chat[] = [];

  chatChange = new Subject<Chat[]>();

  constructor(private notificationService: NotificationService, private contactService: ContactService) {
    /*
    this.chat.push(
      {
        messages: [
          { date: new Date(), outgoing: true, text: 'dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut'},
          { date: new Date(), outgoing: false, text: 'eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua'},
          { date: new Date(), outgoing: true, text: 'sit amet. Lorem ipsum'},
          { date: new Date(), outgoing: false, text: 'sanctus est Lorem ipsum dolor sit'},

          { date: new Date(), outgoing: true, text: 'dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut'},
          { date: new Date(), outgoing: false, text: 'eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua'},
          { date: new Date(), outgoing: true, text: 'sit amet. Lorem ipsum'},
          { date: new Date(), outgoing: false, text: 'sanctus est Lorem ipsum dolor sit'}
        ],
        // tslint:disable-next-line:max-line-length
        owner: {firstName: 'Achim', lastName: 'Müller', image: 'https://ptetutorials.com/images/user-profile.png', display: 'achim-mueller'},
        // tslint:disable-next-line:max-line-length
        partner: {firstName: 'Achim', lastName: 'Müller', image: 'https://ptetutorials.com/images/user-profile.png', display: 'achim-mueller'}
      }
    );
     */
  }

  getChat(partner: string) {
    let foundChat;
    this.chat.forEach( (chat, index) => {
      if (chat.partner.display === partner) {
        foundChat = chat;
        foundChat.index = index;
      }
    });
    return foundChat;
  }

  getChats() {
    return this.chat.slice();
  }

  addChat(chat: Chat) {
    this.chat.push(chat);
    this.chatChange.next(this.chat.slice());
  }

  sendMessage(index: number, message: Message) {
    if (message.outgoing === false) {
      this.notificationService.addNotification(this.chat[index].partner.display);
      this.notificationService.playNotificationSound();
    }

    if (!message.date) {
      message.date = new Date();
    }

    this.chat[index].messages.push(message);
    this.chatChange.next(this.chat.slice());

    this.updateLastMessage(index, message);
  }

  updateLastMessage(index: number, message: Message) {
    this.contactService.updateLastMessageContact(index, message);
  }
}
