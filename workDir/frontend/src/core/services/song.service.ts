import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  getRandomSong() {
    return this.http.get<any>('/api/songs/random');
  }
}
