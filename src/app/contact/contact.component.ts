import { Component, OnInit } from '@angular/core';
import {slideInAnimation} from '../shared/animation/slideIn.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [slideInAnimation]
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
