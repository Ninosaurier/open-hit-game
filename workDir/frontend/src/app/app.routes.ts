import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { LobbyPageComponent } from './features/lobby-page/lobby-page.component';



export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'lobby/:code',
    component: LobbyPageComponent,
  },
];
