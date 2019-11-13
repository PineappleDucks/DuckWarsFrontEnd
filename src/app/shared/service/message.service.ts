import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';

import {Message} from '../model/Message';

import {ContactService} from './contact.service';
import {NotificationService} from './notification.service';
import {Contact} from '../model/Contact';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {
  private contacts: Contact[] = [];
  private activeContact: Contact;
  messagesChange = new Subject<null>();

  private contactSub: Subscription;
  private contactActiveSub: Subscription;

  constructor(private contactService: ContactService, private notificationService: NotificationService) {
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

  getMessage(contact: string, index: number) {
    return this.getContact(contact)[index].messages;
  }

  getMessages(contact: string) {
    return this.getContact(contact).messages.slice();
  }

  addMessage(contact: string, message: Message) {
    this.getContact(contact).messages.push(message);
    this.messagesChange.next();

    if (!message.outgoing) {
      this.notificationService.addNotification(contact);
    }
  }

  editMessage(contact: string, index: number, message: Message) {
    this.getContact(contact).messages[index] =  message;
    this.messagesChange.next();
  }

  deleteMessage(contact: string, index: number) {
    this.getContact(contact).messages.splice(index, 1);
    this.messagesChange.next();
  }

  private getContact(display: string) {
    let foundContact: Contact = null;
    this.contacts.forEach( contact => {
      if (contact.display === display) {
        foundContact = contact;
      }
    });

    return this.checkMessage(foundContact);
  }

  private checkMessage(contact: Contact) {
    if (!contact) {
      return null;
    }

    if (!contact.messages) {
      contact.messages = [];
    }

    return contact;
  }
}
