import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LobbyService } from 'src/app/generated/api/lobby.service';
import { CreateLobbyResponseV1Dto } from 'src/app/generated/model/createLobbyResponseV1Dto';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private router = inject(Router);
  private lobbyService = inject(LobbyService);

  errorMessage!: string;

  playerName = new FormControl('', [Validators.required, Validators.minLength(4)]);

  createLobby() {
    const name = this.playerName.value;

    if (!name) {
      this.errorMessage = 'Please enter a name...';
      return;
    }

    this.lobbyService
      .createLobby({
        playerName: name,
      })
      .subscribe({
        next: (response: CreateLobbyResponseV1Dto) => {
          localStorage.setItem('playerName', name);
          localStorage.setItem('lobbyCode', response.joinCode);

          console.log('Lobby erstellt:', response.joinCode);

          this.router.navigate(['/lobby', response.joinCode]);
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
