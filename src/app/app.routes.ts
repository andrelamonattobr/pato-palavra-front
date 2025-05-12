import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pato',
    loadChildren: () => import('./features/pato-palavra/pato-palavra.module').then(m => m.PatoPalavraModule)
  },
  {
    path: '**',
    redirectTo: 'pato',
    pathMatch: 'full'
  }
];
