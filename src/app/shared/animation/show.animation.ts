import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

export const showAnimation =
  trigger('simpleFadeAnimation', [

    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({opacity: 1, left: '15%' })),

    // fade in when created. this could also be written as transition('void => *')
    transition(':enter', [
      style({opacity: 1, left: '-30%' }),
      animate(500 )
    ]),

    // fade out when destroyed. this could also be written as transition('void => *')
    transition(':leave',
      animate(500, style({opacity: 0})))
  ]);
