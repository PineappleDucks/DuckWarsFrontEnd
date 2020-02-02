import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


import {slideInAnimation} from '../../../shared/animation/slideIn.animation';
import {GameService} from '../../../shared/service/game.service';
import {Chat} from '../../../shared/model/Chat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [slideInAnimation]
})
export class ChatComponent implements OnInit, OnDestroy {
  chat: Chat;
  private sub: Subscription;

  constructor(private gameService: GameService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.gameService.dataChanges.subscribe( data => {
      this.chat = this.gameService.getChat(+this.activatedRoute.snapshot.params.id);
    });

    if (!this.chat) {
      this.router.navigate(['/not-found']).then();
    }
  }

  ngOnDestroy(): void {
  }
}
