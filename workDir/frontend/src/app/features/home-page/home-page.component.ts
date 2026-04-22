import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  playerName?:string = '';
  private router: Router = Inject(Router);

  createLobby() {
    console.log("Create a lobby");
    //this.router.navigate(['/lobby/create']);
  }

  joinLobby() {
    console.log("Join a lobby");
    //this.router.navigate(['/lobby/join']);
  }

  showRules() {
    console.log("Show rules");
    this.router.navigate(['/rules']);
  }
}
