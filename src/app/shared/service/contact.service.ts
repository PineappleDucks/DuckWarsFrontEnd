import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Contact} from '../model/Contact';
import {Message} from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  contactChange = new Subject<Contact[]>();

  constructor() {
    /*
    this.contacts.push(
      {
        lastMessage: {date: new Date(), outgoing: true, text: 'vrfdnbvjkfthgdbvhjgfd'},
        // tslint:disable-next-line:max-line-length
        owner: {firstName: 'Achim', lastName: 'Müller', image: 'https://ptetutorials.com/images/user-profile.png', display: 'achim-mueller'},
        isActive: false
      },
      {
        lastMessage: {date: new Date(), outgoing: false, text: 'vrfdnbvjkfthgdbvhjgfd'},
        owner: {firstName: 'Peter', lastName: 'Meier', image: 'https://ptetutorials.com/images/user-profile.png', display: 'peter-meier'},
        isActive: false
      },
    );
     */
  }

  getContacts() {
    return this.contacts.slice();
  }

  setActive(i: number) {
    this.contacts.forEach((item, index) => {
      if (index !== i) {
        item.isActive = false;
      }
    });

    if (i !== null) {
      this.contacts[i].isActive = true;
    }

    this.contactChange.next(this.contacts.slice());
  }

  updateLastMessageContact(index: number, message: Message) {
    this.contacts[index].lastMessage = message;
    this.contactChange.next(this.contacts.slice());
  }


  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contactChange.next(this.contacts.slice());
  }

  removeContact(index: number) {
    this.contacts.splice(index, 1);
    this.contactChange.next(this.contacts.slice());
  }
}
