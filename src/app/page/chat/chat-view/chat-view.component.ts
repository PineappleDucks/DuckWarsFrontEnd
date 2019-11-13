import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {LoadingService} from '../../../shared/service/loading.service';

import {Contact} from '../../../shared/model/Contact';
import {NotificationService} from '../../../shared/service/notification.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewChecked {
  isLoading: boolean;

  private loadingSub: Subscription;

  @Input() contact: Contact;
  @ViewChild('scroll', {static: false}) private myScrollContainer: ElementRef;

  constructor(private loadingService: LoadingService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.isLoading = this.loadingService.isLoading();

    this.loadingSub = this.loadingService.isLoadingChange.subscribe( state => {
      this.isLoading = state;
    });

    this.notificationService.resetNotification(this.contact.display);
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
}
