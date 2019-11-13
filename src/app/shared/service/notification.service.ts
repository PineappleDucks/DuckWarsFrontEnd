import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Notification} from '../model/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification: Notification = {
    count: 0,
    contact: new Map<string, number>()
  };

  notificationChange = new BehaviorSubject<{}>(this.notification);

  constructor() { }

  getNotification() {
    return this.notification;
  }

  getNotificationContact(contact: string) {
    return this.notification.contact.get(contact);
  }

  getNotificationCount(contact: string) {
    return this.notification.count;
  }

  resetNotification(contact: string) {
    if (this.notification.contact.get(contact)) {
      this.notification.count = this.notification.count - this.notification.contact.get(contact);
      this.notification.contact.set(contact, 0);
    }

    this.notificationChange.next(this.notification);
  }

  addNotification(contact: string) {
    this.notification.count += 1;
    const count = this.notification.contact.get(contact) ? this.notification.contact.get(contact) + 1 : 1;
    this.notification.contact.set(contact, count);
    this.notificationChange.next(this.notification);
  }
}
