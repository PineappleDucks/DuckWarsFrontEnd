import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../../shared/model/Contact';
import {ContactService} from '../../../shared/service/contact.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private contactSub: Subscription;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactSub = this.contactService.contactsChange.subscribe( contacts => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
  }

  onClick(index: number, contact: string) {
    this.contactService.setContactActive(index);

    this.router.navigate(['/chat/' + contact]).then();
  }

}
