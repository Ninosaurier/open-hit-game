import { Component, Inject } from '@angular/core';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

  private router: Router = Inject(Router);

  playerName = new FormControl('', [Validators.required, Validators.minLength(4)]);

  createLobby() {
    console.log("Create a lobby with player name: " + this.playerName.value);
    //this.router.navigate(['/lobby/create']);
  }

  showRules() {
    console.log("Show rules");
    this.router.navigate(['/rules']);
  }
}
