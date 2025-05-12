import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatoPalavraRoutingModule } from './pato-palavra-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    PatoPalavraRoutingModule
  ]
})
export class PatoPalavraModule { }
