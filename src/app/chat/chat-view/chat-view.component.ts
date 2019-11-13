import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../shared/service/chat.service';
import {Subscription} from 'rxjs';
import {Chat} from '../../shared/model/Chat';
import {NotificationService} from '../../shared/service/notification.service';
import {LoadingService} from '../../shared/service/loading.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewChecked {
  now = new Date();
  chat: Chat;
  chatId: number;
  private chatSub: Subscription;
  isLoading: boolean;
  private loadingSub: Subscription;

  @Input() partner: string;

  @ViewChild('scroll', {static: false}) private myScrollContainer: ElementRef;

  constructor(private chatService: ChatService, private notificationService: NotificationService, private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.isLoading = this.loadingService.isLoading();
    this.chat = this.chatService.getChat(this.partner);
    this.chatId = this.chat.index;

    this.chatSub = this.chatService.chatChange.subscribe(() => {
      this.chat = this.chatService.getChat(this.partner);
      this.chatId = this.chat.index;
      this.scrollToBottom();
    });
    this.loadingSub = this.loadingService.isLoadingChange.subscribe( data => {
      this.isLoading = data;
    });
  }

  ngOnDestroy(): void {
    this.chatSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.notificationService.resetNotification(this.chat.partner.display);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }

    setTimeout( () => {
      this.notificationService.resetNotification(this.chat.partner.display);
    }, 200);
  }


}
