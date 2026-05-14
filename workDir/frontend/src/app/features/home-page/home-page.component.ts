import { Component, inject } from '@angular/core';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CreateLobbyResponseDto } from '../lobby-page/dto/create-lobby-request.dto';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

  private router = inject(Router);
  private http = inject(HttpClient);

  errorMessage!: string;

  playerName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  createLobby(): void {

    if (this.playerName.invalid || !this.playerName.value) {
      this.errorMessage = 'Bitte gib einen gültigen Namen ein.';
      return;
    }

    this.errorMessage = '';

    const payload = {
      playerName: this.playerName.value,
    };

    this.http.post<CreateLobbyResponseDto>('/api/lobbies', payload)
      .subscribe({
        next: (response) => {

          localStorage.setItem('playerName', this.playerName.value!);
          localStorage.setItem('lobbyCode', response.joinCode);
          console.log('Code: ', response.joinCode);
          //this.router.navigate(['/lobby', response.joinCode]);
        },

        error: (error) => {
          console.error(error);

          this.errorMessage =
            error?.error?.message ||
            'Lobby konnte nicht erstellt werden.';
        },
      });
  }

  showRules(): void {
    console.log('Show rules (future)');
    this.router.navigate(['/rules']);
  }
}