import { Component } from '@angular/core';
import { SongService } from '../../../core/services/song.service';

// @ts-ignore
@Component({
  selector: 'song-component',
  imports: [],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css',
})
export class SongComponent {

  song: any;

  constructor(private songService: SongService) {}

  loadSong() {
    this.songService.getRandomSong()
      .subscribe(data => this.song = data);
  }
}
