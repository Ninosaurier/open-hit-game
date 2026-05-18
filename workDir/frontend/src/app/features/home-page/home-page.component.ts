import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../../core/api/api';
import { createLobby } from '../../../core/api/fn/lobby/create-lobby';
import { CreateLobbyResponseV1Dto } from '../../../core/api/models/create-lobby-response-v-1-dto';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private router = inject(Router);
  private api = inject(Api);

  errorMessage!: string;

  playerName = new FormControl('', [Validators.required, Validators.minLength(4)]);

  createLobby() {
    const name = this.playerName.value;

    if (!name) {
      this.errorMessage = 'Please enter a name...';
      return;
    }

    createLobby(this.api['http'], this.api.rootUrl, { body: { playerName: name } }).pipe(
      map(response => response.body)
    ).subscribe({
      next: (response: CreateLobbyResponseV1Dto) => {
        localStorage.setItem('playerName', name);
        localStorage.setItem('lobbyCode', response.joinCode);

        console.log('Lobby erstellt:', response.joinCode);

        //this.router.navigate(['/lobby', response.joinCode]);
      },

      error: (err: Error) => {
        console.error(err);

        this.errorMessage = err?.message + ' Can not create a room.';
      },
    });
  }

  showRules(): void {
    console.log('Show rules (future)');
    this.router.navigate(['/rules']);
  }
}