import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Contact} from '../../shared/model/Contact';

import {slideInAnimation} from '../../shared/animation/slideIn.animation';

import {ContactService} from '../../shared/service/contact.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [slideInAnimation]
})
export class ChatComponent implements OnInit {
  contact: Contact;
  private contactSub: Subscription;

  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
    this.contactSub = this.contactService.activeContact.subscribe( contact => {
      this.contact = contact;
    });

    if (!this.contact) {
      this.router.navigate(['/not-found']).then();
    }
  }
}
