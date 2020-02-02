import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../shared/model/Message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() user: { image: string, display: string};

  constructor() { }

  ngOnInit() {
    /*
    const split = this.message.text.split('\n');

    this.message.text = '';
    split.forEach( element => {
      this.message.text = this.message.text + element + '\n\b';
    });*/
  }

}
