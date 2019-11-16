import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {Subscription} from 'rxjs';

import {NotificationService} from '../shared/service/notification.service';
import {ContactService} from '../shared/service/contact.service';
import {HelperService} from '../shared/service/helper.service';

import {Notification} from '../shared/model/Notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  notificationCount = 0;
  private notificationSub: Subscription;

  title: string;
  animation: string;

  constructor(private notificationService: NotificationService,
              public router: Router,
              private route: ActivatedRoute,
              private contactService: ContactService,
              private helperService: HelperService) { }

  ngOnInit() {
    this.notificationSub = this.notificationService.notificationChange.subscribe( (notification: Notification) => {
      this.notificationCount = notification.count;
    });

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const d =  data.state.root.firstChild.data;
        this.title = d.title;
        this.animation = d.animation;
      }
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
    // this.helperService.openSnackBar('Kein Netz!');
  }

  getNotification() {
    return this.notificationCount !== 0 ? this.notificationCount : null;
  }
}
