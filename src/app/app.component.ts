import {Component, OnInit, isDevMode, OnDestroy, AfterViewChecked} from '@angular/core';

import {slideInAnimation} from './shared/animation/slideIn.animation';

import {ContactService} from './shared/service/contact.service';
import {MessageService} from './shared/service/message.service';
import {ActionsService} from './shared/service/actions.service';
import {SwPush} from '@angular/service-worker';
import {PushService} from './shared/service/push.service';
import {LoadingIndicatorService} from './shared/service/loading-indicator.service';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  readonly VAPID_PUBLIC_KEY = 'BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo'; // temp

  private loadingSub: Subscription;
  isLoading: true;

  constructor(private contactService: ContactService,
              private messageService: MessageService,
              private actionService: ActionsService,
              private swPush: SwPush,
              private pushService: PushService,
              private authService: AuthService,
              private loadingIndicator: LoadingIndicatorService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loadingSub = this.loadingIndicator.event.subscribe( state => {
      this.isLoading = state;
    });


    // test data

    this.contactService.addContact( {
      display: 'D2R2',
      image: 'assets/images/profile-icon/D2R2.png',
      firstName: 'D2R2',
      lastName: ''
    });

    this.contactService.addContact( {
      display: 'stormtrooper',
      image: 'assets/images/profile-icon/Stormtrooper.png',
      firstName: 'Stormtrooper',
      lastName: ''
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test',
      outgoing: false,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test 2',
      outgoing: true,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test',
      outgoing: false,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test 2',
      outgoing: true,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test',
      outgoing: false,
      date: new Date()
    });

    this.messageService.addMessage('D2R2', {
      text: 'Test 2',
      outgoing: true,
      date: new Date()
    });

    this.actionService.addAction('D2R2', {
      display: 'Action 1',
      value: 'Value 1'
    });
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    if (environment.production) {
      this.subscribeToNotifications();
    }
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then( sub => {
        this.pushService.addPushSubscriber(sub).subscribe();
      })
      .catch( err => {
        console.error('Could not subscripe to notifications', err);
      });
  }
}
