import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LobbyService } from '../../../core/api/api/lobby.service';
import { CreateLobbyResponseV1Dto } from '../../../core/api/model/createLobbyResponseV1Dto';
import { LoggingService } from '../../core/services/logging/logging-service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private router: Router = inject(Router);
  private lobbyService: LobbyService = inject(LobbyService);
  private loggingService: LoggingService = inject(LoggingService);

  errorMessage!: string;

  /**
    Stores the name of the player
  */
  playerName: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  onCreateLobby() {
    const name = this.playerName.value;

    if (!name) {
      this.errorMessage = 'Please enter a name...';
      return;
    }

    this.lobbyService.createLobby({ playerName: name }).subscribe({
      next: (response: CreateLobbyResponseV1Dto) => {

        this.loggingService.log('Lobby successfully created! Joincode is ', response.joinCode);
        this.router.navigate(['/lobby', response.joinCode]);
      },

      error: (err: Error) => {
        this.loggingService.error(err.message, err);
        this.errorMessage = err?.message + ' Can not create a room.';
      },
    });
  }

  showRules(): void {
    this.loggingService.log('Not implemented');
    this.router.navigate(['/rules']);
  }
}
