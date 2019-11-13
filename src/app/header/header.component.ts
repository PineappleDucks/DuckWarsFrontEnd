import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../shared/service/notification.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ContactService} from '../shared/service/contact.service';
import {Notification} from '../shared/model/Notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  notificationCount = 0;
  private notificationSub: Subscription;

  constructor(private notificationService: NotificationService,
              public router: Router,
              private contactService: ContactService) { }

  ngOnInit() {
    this.notificationSub = this.notificationService.notificationChange.subscribe( (notification: Notification) => {
      this.notificationCount = notification.count;
    });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }

  ngAfterViewInit(): void {
  }

  onReset() {
    this.contactService.setContactActive(null);
  }

  onCall() {

  }

  getNotification() {
    return this.notificationCount !== 0 ? this.notificationCount : null;
  }
}
