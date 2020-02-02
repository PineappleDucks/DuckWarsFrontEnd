import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {LoadingService} from '../../../../shared/service/loading.service';

import {Contact} from '../../../../shared/model/Contact';
import {NotificationService} from '../../../../shared/service/notification.service';
import {Chat} from '../../../../shared/model/Chat';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() chat: Chat;
  @ViewChild('scroll', {static: false}) private myScrollContainer: ElementRef;

  constructor(private loadingService: LoadingService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.resetNotification(this.chat.chatId);
  }

  ngOnDestroy(): void {
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

  getDialogOptions() {
    return this.chat.messageList[this.chat.messageList.length - 1 ].dialogOptions;
  }
}
