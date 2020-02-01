import { Component, OnInit } from '@angular/core';
import {GameService} from '../../shared/service/game.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  onSelect(side: string) {
    this.gameService.chooseScenario(side);
  }
}
