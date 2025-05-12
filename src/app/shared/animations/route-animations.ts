import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  // Main -> Score: slide from right to left
  transition('main => score', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
    ]),
    // Hide right-sidebar from main page at start
    query(':leave .right-sidebar', [
      style({ opacity: 1 })
    ], { optional: true }),
    // Hide left-sidebar in score page initially
    query(':enter .left-sidebar', [
      style({ opacity: 0 })
    ], { optional: true }),
    // Initial position for entering page
    query(':enter', [
      style({ left: '100%' })
    ]),
    query(':leave', animateChild()),
    group([
      // Animate main page out
      query(':leave', [
        animate('300ms ease-out', style({ left: '-100%' }))
      ]),
      // Fade out right-sidebar
      query(':leave .right-sidebar', [
        animate('150ms ease-out', style({ opacity: 0 }))
      ], { optional: true }),
      // Animate score page in
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' }))
      ])
    ]),
    // After main animation completes, fade in left-sidebar
    query(':enter .left-sidebar', [
      animate('250ms ease-in', style({ opacity: 1 }))
    ], { optional: true }),
    query(':enter', animateChild())
  ]),
  
  // Score -> Main: slide from left to right
  transition('score => main', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
    ]),
    // Hide left-sidebar from score page at start
    query(':leave .left-sidebar', [
      style({ opacity: 1 })
    ], { optional: true }),
    // Hide right-sidebar in main page initially
    query(':enter .right-sidebar', [
      style({ opacity: 0 })
    ], { optional: true }),
    // Initial position for entering page
    query(':enter', [
      style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      // Animate score page out
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%' }))
      ]),
      // Fade out left-sidebar
      query(':leave .left-sidebar', [
        animate('150ms ease-out', style({ opacity: 0 }))
      ], { optional: true }),
      // Animate main page in
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' }))
      ])
    ]),
    // After main animation completes, fade in right-sidebar
    query(':enter .right-sidebar', [
      animate('250ms ease-in', style({ opacity: 1 }))
    ], { optional: true }),
    query(':enter', animateChild())
  ])
]);
