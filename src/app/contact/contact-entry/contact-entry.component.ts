import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../shared/model/Contact';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/service/notification.service';

@Component({
  selector: 'app-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.css']
})
export class ContactEntryComponent implements OnInit, OnDestroy {
  @Input() data: Contact;

  notification: {};
  private notificationSub: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notification = this.notificationService.getNotifications();
    this.notificationSub = this.notificationService.notificationChange.subscribe(data => {
      this.notification = data;
    });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }

}
