import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../../../shared/service/game.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat-loading',
  templateUrl: './chat-loading.component.html',
  styleUrls: ['./chat-loading.component.css']
})
export class ChatLoadingComponent implements OnInit, OnDestroy {

  private gameSub: Subscription;
  isLoading = false;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameSub = this.gameService.loadingChanges.subscribe( value => {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    this.gameSub.unsubscribe();
  }

}
