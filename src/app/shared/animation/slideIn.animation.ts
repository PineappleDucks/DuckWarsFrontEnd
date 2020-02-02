import {animate, group, query, style, transition, trigger} from '@angular/animations';

// 1 Layer --> Layer 2 --> Layer 3
export const slideInAnimation =
  trigger('routeAnimations', [
    // Layer 1 --> *
    transition('Layer1 => *', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateX(100%)', zIndex: 1000}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateX(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(-100%)'}))
        ], {optional: true}),
      ])
    ]),
    // Layer 3 --> *
    transition('Layer3 => *', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateX(-100%)', zIndex: 1000}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateX(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(100%)'}))
        ], {optional: true}),
      ])
    ]),
    // Layer 2 --> Layer 1
    transition('Layer2 => Layer1', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateX(-100%)', zIndex: 1000}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateX(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(100%)'}))
        ], {optional: true}),
      ])
    ]),
    // Layer 2 --> Layer 3
    transition('Layer2 => Layer3', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateX(100%)', zIndex: 1000}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateX(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(-100%)'}))
        ], {optional: true}),
      ])
    ]),
    // Layer 2 --> Layer 2
    transition('Layer2 => Layer2', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateX(100%)', zIndex: 1000}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateX(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({transform: 'translateX(-100%)'}))
        ], {optional: true}),
      ])
    ]),
    // Home --> Layer1
    transition('Home => Layer1', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateY(100%)', zIndex: 1000}),
          animate('0.3s ease-in-out',
            style({transform: 'translateY(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateY(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({transform: 'translateY(-100%)'}))
        ], {optional: true}),
      ])
    ]),
    // Layer1 --> Home
    transition('Layer1 => Home', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100vw', height: 'calc( 100vh - 64px )', zIndex: 1000}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateY(-100%)', zIndex: 1000}),
          animate('0.3s ease-in-out',
            style({transform: 'translateY(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateY(0%)', zIndex: 999}),
          animate('0.3s ease-in-out',
            style({transform: 'translateY(100%)'}))
        ], {optional: true}),
      ])
    ]),
  ]);

export const fadeAnimation =

  trigger('fadeAnimation', [



  ]);
