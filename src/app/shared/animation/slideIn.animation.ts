import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Right-to-Left => *', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', zIndex: 1000 }),
          animate('0.3s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform:   'translateX(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('Left-to-Right => *', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)', zIndex: 1000 }),
          animate('0.3s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', zIndex: 999 }),
          animate('0.3s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ])
  ]);
