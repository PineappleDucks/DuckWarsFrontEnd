import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: {} = {};
  count = 0;
  notificationChange = new Subject<{}>();

  constructor() { }

  getNotificationCount() {
    return this.count;
  }

  getNotifications() {
    return this.notifications;
  }

  getNotification(display: string) {
    return this.notifications[display];
  }

  addNotification(display: string) {
    const temp = this.notifications[display];
    if (temp) {
      this.notifications[display] = this.notifications[display] + 1;
    } else {
      this.notifications[display] = 1;
    }

    this.count++;
    this.notificationChange.next(this.notifications);

    // this.playNotificationSound();
  }

  resetNotification(display: string) {
    this.count = this.count - this.notifications[display];
    this.notifications[display] = null;
    this.notificationChange.next(this.notifications);
  }

  playNotificationSound() {
    const audio = new Audio();
    audio.src = 'assets/audio/R2D2-do.mp3';
    audio.load();
    audio.volume = 0.25;
    audio.play().then();
  }
}
