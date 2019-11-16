import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActionsService} from '../../../shared/service/actions.service';
import {Subscription} from 'rxjs';
import {Action} from '../../../shared/model/Action';
import {MessageService} from '../../../shared/service/message.service';
import {HelperService} from '../../../shared/service/helper.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit, OnDestroy {
  @Input() display: string;
  actions: Action[];
  private actionSub: Subscription;

  constructor(private actionsService: ActionsService,
              private messageService: MessageService,
              private helperService: HelperService) { }

  ngOnInit() {
    this.actions = this.actionsService.getActions(this.display);
    this.actionSub = this.actionsService.actionChange.subscribe( data => {
      this.actions = this.actionsService.getActions(this.display);
    });
  }

  ngOnDestroy(): void {
    this.actionSub.unsubscribe();
  }

  onClickAction(action: Action, index: number) {
    this.messageService.addMessage(this.display, {
      text: action.value,
      outgoing: true,
      date: new Date()
    });
    this.actionsService.deleteAction(this.display, index);
  }

  onSend() {
    // this.helperService.openSnackBar('Kein Netz!');
  }
}
