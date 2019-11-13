import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {Injectable, OnDestroy} from '@angular/core';

import {Action} from '../model/Action';

import {ContactService} from './contact.service';
import {Contact} from '../model/Contact';

@Injectable({
  providedIn: 'root'
})
export class ActionsService implements OnDestroy {
  private contacts: Contact[] = [];
  private activeContact: Contact;
  actionChange = new BehaviorSubject<null>(null);

  private contactSub: Subscription;
  private contactActiveSub: Subscription;

  constructor(private contactService: ContactService) {
    this.initService();
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
    this.contactActiveSub.unsubscribe();
  }

  private initService() {
    this.contactSub = this.contactService.contactsChange.subscribe( contacts => {
      if (contacts) {
        this.contacts = contacts;
      }
    });

    this.contactActiveSub = this.contactService.activeContact.subscribe( contact => {
      if (contact) {
        this.activeContact = contact;
      }
    });
  }

  getAction(contact: string, index: number) {
    return this.getContact(contact)[index].actions;
  }

  getActions(contact: string) {
    return this.getContact(contact).actions.slice();
  }

  addAction(contact: string, action: Action) {
    this.getContact(contact).actions.push(action);
    this.actionChange.next(null);
  }

  editAction(contact: string, index: number, action: Action) {
    this.getContact(contact).actions[index] = action;
    this.actionChange.next(null);
  }

  deleteAction(contact: string, index: number) {
    this.getContact(contact).actions.splice(index, 1);
    this.actionChange.next(null);
  }

  private getContact(display: string) {
    let foundContact: Contact = null;
    this.contacts.forEach( contact => {
      if (contact.display === display) {
        foundContact = contact;
      }
    });

    return this.checkActions(foundContact);
  }

  private checkActions(contact: Contact) {
    if (!contact) {
      return null;
    }

    if (!contact.actions) {
      contact.actions = [];
    }

    return contact;
  }
}
