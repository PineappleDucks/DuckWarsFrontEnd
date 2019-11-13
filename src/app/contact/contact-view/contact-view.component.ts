import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../shared/model/Contact';
import {ContactService} from '../../shared/service/contact.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private contactSub: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactSub = this.contactService.contactChange.subscribe( data => {
      this.contacts = data;
    });
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
  }

  onSetActive(i: number) {
    this.contactService.setActive(i);
  }

}
