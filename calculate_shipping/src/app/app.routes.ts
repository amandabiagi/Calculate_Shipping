import { Routes } from '@angular/router';
import path from 'path';
import { CalculateComponent } from './modules/calculate/component/calculate.component';

export const routes: Routes = [
  {
    path: '',
    component: CalculateComponent,
    pathMatch: 'full',
  },
];
