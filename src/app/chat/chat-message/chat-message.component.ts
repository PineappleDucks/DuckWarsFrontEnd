import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../shared/model/Message';
import {User} from '../../shared/model/User';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() data: Message;
  @Input() owner: User;

  constructor() { }

  ngOnInit() {
  }

}
