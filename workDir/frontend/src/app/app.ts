import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongComponent } from './../shared/components/song/song.component';
// @ts-ignore
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SongComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
