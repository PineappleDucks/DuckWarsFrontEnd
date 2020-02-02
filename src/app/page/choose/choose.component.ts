import { Component, OnInit } from '@angular/core';
import {GameService} from '../../shared/service/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {

  }

  onSelect(side: string) {
    this.gameService.chooseScenario(side);

    const id = this.gameService.getChats()[0].chatId;
    this.router.navigate(['/chat/']).then();
  }
}
