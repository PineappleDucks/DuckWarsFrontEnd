import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {GameService} from '../../../shared/service/game.service';
import {Chat} from '../../../shared/model/Chat';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit, OnDestroy {
  chats: Chat[];
  private sub: Subscription;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.sub = this.gameService.dataChanges.subscribe( data => {
      this.chats = this.gameService.getChats();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onClick(id: number) {
    this.router.navigate(['/chat/', id]).then();
  }
}
