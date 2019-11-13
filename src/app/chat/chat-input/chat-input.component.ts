import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../shared/service/chat.service';
import {Message} from '../../shared/model/Message';
import {ActionsService} from '../../shared/service/actions.service';
import {Subscription} from 'rxjs';
import {Action} from '../../shared/model/Action';
import {ContactService} from '../../shared/service/contact.service';
import {LoadingService} from '../../shared/service/loading.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit, OnDestroy {
  @Input() id: number;
  actions: Action[];
  private actionSub: Subscription;

  constructor(private chatService: ChatService, private actionsService: ActionsService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.actions = this.actionsService.getActions();
    this.actionSub = this.actionsService.actionChange.subscribe( data => {
      this.actions = data;
    });
  }

  ngOnDestroy(): void {
    this.actionSub.unsubscribe();
  }

  onAnswer(action: Action, index: number) {
    const message: Message = {
      text: action.value,
      date: new Date(),
      outgoing: true
    };

    this.chatService.sendMessage(this.id, message);

    setTimeout( () => {
      this.loadingService.setLoading();
    }, action.triggerAfter / 2.5);

    setTimeout( () => {
      this.chatService.sendMessage(this.id, action.appearMessage);
      this.loadingService.finishLoading();
    }, action.triggerAfter);

    this.actionsService.deleteAction(index);

  }
}
