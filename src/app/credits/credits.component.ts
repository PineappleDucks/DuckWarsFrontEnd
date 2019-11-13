import { Component, OnInit } from '@angular/core';
import {Credit} from '../shared/model/Credit';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  credits: Credit[] = [];

  constructor() {
    this.credits.push({
      title: 'Trailer',
      message: 'bla bla',
      name: 'Rene, Andre, Sebastian',
      icon: 'videocam'
    },{
      title: 'Texte',
      message: 'bla bla',
      name: 'Ole, Magdalena',
      icon: 'format_align_justify'
    },{
      title: 'System Architektur',
      message: 'bla bla',
      name: 'Marcel',
      icon: 'dashboard'
    });
  }

  ngOnInit() {
  }

}
