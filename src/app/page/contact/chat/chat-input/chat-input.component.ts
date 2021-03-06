import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HelperService} from '../../../../shared/service/helper.service';
import {GameService} from '../../../../shared/service/game.service';
import {DialogOption} from '../../../../shared/model/DialogOption';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit, OnDestroy {
  @Input() chatId: number;
  @Input() dialogOption: DialogOption[];

  constructor(private helperService: HelperService,
              private gameService: GameService) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  onClickAction(id) {
    console.log('selected answerId: ' + id);
    this.gameService.messageRoute(this.chatId, this.dialogOption.find(element => element.id === id));
  }

  onSend() {

  }
}
