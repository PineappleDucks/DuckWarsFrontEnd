import {Action} from '../model/Action';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Message} from '../model/Message';
import {ChatService} from './chat.service';
import {LoadingService} from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  private actions: Action[] = [];
  actionChange = new Subject<Action[]>();

  constructor(private chatService: ChatService, private loadingService: LoadingService) {
    /*
    this.actions.push({
      display: 'Wer bist du?',
      triggerAfter: 3000,
      value: 'Wer bist du eigentlich? Ich kenne dich nicht ...',
      appearMessage: {
        text: 'Ich bin deine persönliche AI',
        outgoing: false,
        date: new Date()
      }
    });
     */
  }

  emitAction(chatId: number, action: Action) {
    const message: Message = {
      text: action.value,
      date: new Date(),
      outgoing: true
    };

    this.chatService.sendMessage(chatId, message);

    setTimeout( () => {
      this.loadingService.setLoading();
    }, action.triggerAfter / 2.5);

    setTimeout( () => {
      this.chatService.sendMessage(chatId, action.appearMessage);
      this.loadingService.finishLoading();
    }, action.triggerAfter);

    this.deleteActionObj(action);
  }

  getActions() {
    return this.actions.slice();
  }

  addAction(action: Action) {
    this.actions.push(action);
    this.actionChange.next(this.actions);
  }

  deleteAction(index: number) {
    this.actions.splice(index, 1);
    this.actionChange.next(this.actions);
  }

  deleteActionObj(action: Action) {
    this.actions.forEach( (item, index) => {
      if (item === action) {
        this.actions.splice(index, 1);
      }
    });

    this.actionChange.next(this.actions);
  }
}
