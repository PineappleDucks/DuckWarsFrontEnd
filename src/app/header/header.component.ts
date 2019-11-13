import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotificationService} from '../shared/service/notification.service';
import {Subscription} from 'rxjs';
import {ChatService} from '../shared/service/chat.service';
import {ContactService} from '../shared/service/contact.service';
import {Contact} from '../shared/model/Contact';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  notification: {};
  notificationCount: number;
  private notificationSub: Subscription;
  private notificationSub2: Subscription;

  chatName: string;

  constructor(public router: Router,
              private notificationService: NotificationService,
              public contactService: ContactService) { }

  ngOnInit() {
    this.notification = this.notificationService.getNotifications();
    this.notificationSub = this.notificationService.notificationChange.subscribe(data => {
      this.notification = data;
    });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
    this.notificationSub2.unsubscribe();
  }

  onCall() {
    this.notificationCount = this.notificationService.getNotificationCount();
    this.notificationSub2 = this.notificationService.notificationChange.subscribe(data => {
      this.notificationCount = this.notificationService.getNotificationCount();
      if (this.notificationCount === 0) {
        this.notificationCount = null;
      }
    });

  }

  ngAfterViewInit(): void {
  }
}
