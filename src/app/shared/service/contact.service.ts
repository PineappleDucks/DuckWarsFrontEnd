import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {Contact} from '../model/Contact';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy {
  private contacts: Contact[] = [];
  contactsChange = new BehaviorSubject<Contact[]>(this.contacts);
  activeContact = new BehaviorSubject <Contact>(null);

  private routerSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initService();
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  private initService() {
    this.routerSub = this.router.events.subscribe( (params: Params) => {
      if (params instanceof NavigationEnd) {
        this.contacts.forEach(contact => {
          if (contact && '/chat/' + contact.display === params.url) {
            this.activeContact.next(contact);
          }
        });
      }
    });
  }

  getContact(index: number) {
    return this.contacts[index];
  }

  getContacts() {
    return this.contacts.slice();
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contactsChange.next(this.contacts.slice());
  }

  removeContact(index: number) {
    this.contacts.splice(index, 1);
    this.contactsChange.next(this.contacts.slice());
  }

  editContact(index: number, contact: Contact) {
    this.contacts[index] = contact;
    this.contactsChange.next(this.contacts.slice());
  }

  setContactActive(index: number) {
    this.setAllInActive();

    if (index) {
      this.contacts[index].isActive = true;
      this.activeContact.next(this.contacts[index]);
    } else {
      this.activeContact.next(null);
    }
  }

  private setAllInActive() {
    this.contacts.forEach( contact => {
      contact.isActive = false;
    });
  }
}
