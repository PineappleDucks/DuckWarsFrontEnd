import { Component, OnInit } from '@angular/core';
import {ChatService} from '../shared/service/chat.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Chat} from '../shared/model/Chat';
import {slideInAnimation} from '../shared/animation/slideIn.animation';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [slideInAnimation]
})
export class ChatComponent implements OnInit {
  partner: string;
  chat: Chat;

  constructor(private chatService: ChatService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.partner = params.name;
          this.chat = this.chatService.getChat(params.name);
      }
    );

    if (!this.chat) {
      this.router.navigate(['/not-found']);
    }
  }

}
