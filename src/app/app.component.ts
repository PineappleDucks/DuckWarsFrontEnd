import {AfterViewChecked, Component, OnInit} from '@angular/core';

import {slideInAnimation} from './shared/animation/slideIn.animation';

import {ContactService} from './shared/service/contact.service';
import {MessageService} from './shared/service/message.service';
import {ActionsService} from './shared/service/actions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, AfterViewChecked {
  constructor(private contactService: ContactService,
              private messageService: MessageService,
              private actionService: ActionsService) { }

  ngOnInit(): void {
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

  ngAfterViewChecked(): void {

  }
}
