import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Open Hit Game');
}
