import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Notification} from '../../../shared/model/Notification';

import {NotificationService} from '../../../shared/service/notification.service';
import {Chat} from '../../../shared/model/Chat';
import {Message} from '../../../shared/model/Message';

@Component({
  selector: 'app-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.css']
})
export class ContactEntryComponent implements OnInit, OnDestroy {
  @Input() chat: Chat;

  notification: Notification;
  private notificationSub: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    console.log(this.chat);
    this.notificationSub = this.notificationService.notificationChange.subscribe((notification: Notification) => {
      this.notification = notification;
    });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }

  getLastMessage() {
    if (this.chat.messageList) {
      const index = this.chat.messageList.length - 1;
      const message = this.chat.messageList[index];

      if (message.text.length > 50) {
        const messageCopy: Message = {
          messageId: message.messageId,
          text: message.text.slice(0, 50) + ' ...',
          date: message.date,
          dialogOptions: message.dialogOptions,
          author: message.author
        };

        return messageCopy;
      }

      return message;
    }

    return null;
  }

  getNotification(chat: number) {
    console.log(chat);
    console.log(this.notification.chat);

    const value = this.notification.chat.get(chat);

    if (value) {
      console.log(value);
      return value;
    }

    return null;
  }
}
