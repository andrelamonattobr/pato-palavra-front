import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ScorePageComponent } from './pages/score-page/score-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    data: { animation: 'main' }
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },{
    path: 'score',
    component: ScorePageComponent,
    data: { animation: 'score' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatoPalavraRoutingModule { }
