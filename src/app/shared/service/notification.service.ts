import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Notification} from '../model/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification: Notification = {
    count: 0,
    chat: new Map<number, number>()
  };

  notificationChange = new BehaviorSubject<{}>(this.notification);

  constructor() { }

  getNotification() {
    return this.notification;
  }

  getNotificationContact(chat: number) {
    return this.notification.chat.get(chat);
  }

  getNotificationCount(contact: string) {
    return this.notification.count;
  }

  resetNotification(chat: number) {
    if (this.notification.chat.get(chat)) {
      this.notification.count = this.notification.count - this.notification.chat.get(chat);
      this.notification.chat.set(chat, 0);
    }

    this.notificationChange.next(this.notification);
  }

  addNotification(chat: number) {
    this.notification.count += 1;
    const count = this.notification.chat.get(chat) ? this.notification.chat.get(chat) + 1 : 1;
    this.notification.chat.set(chat, count);
    this.notificationChange.next(this.notification);
  }

  resetNotifications() {
    this.notification = {
      count: 0,
      chat: new Map<number, number>()
    };

    this.notificationChange.next(this.notification);
  }
}
