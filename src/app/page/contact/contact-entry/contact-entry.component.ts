import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Contact} from '../../../shared/model/Contact';
import {Notification} from '../../../shared/model/Notification';

import {NotificationService} from '../../../shared/service/notification.service';

@Component({
  selector: 'app-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.css']
})
export class ContactEntryComponent implements OnInit, OnDestroy {
  @Input() contact: Contact;

  notification: Notification;
  private notificationSub: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationSub = this.notificationService.notificationChange.subscribe((notification: Notification) => {
      this.notification = notification;
    });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }

  getLastMessage() {
    if (this.contact.messages) {
      const index = this.contact.messages.length - 1;
      return this.contact.messages[index];
    }

    return null;
  }

  getNotification(contact: string) {
    return this.notification.contact.get(contact) !== 0 ? this.notification.contact.get(contact) : null;
  }

}
