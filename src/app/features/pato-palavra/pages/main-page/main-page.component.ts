import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { GameService } from '../../../../core/services/game/game.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  standalone: false
})
export class MainPageComponent implements OnInit, AfterViewInit {

  statusText: string = "Waiting for players...";

  @ViewChild('wordInput') myInput!: ElementRef;

  constructor(private authService: AuthService, private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.statusText = "Waiting for players...";
  }

  ngAfterViewInit(): void {
    this.myInput.nativeElement;
  }

  logout() {
    sessionStorage.removeItem("token");
    this.router.navigate(['pato/auth']);
  }

  score() {
    this.router.navigate(['pato/score']);
  }

  submitWord(word: string) {
    this.gameService.sendWord(word).then(response => {
      this.statusText = response.message;

      setTimeout(() => {
        this.statusText = "Waiting for players...";
      }, 2500);

    }).catch(error => {
      this.authService.logout();
      this.router.navigate(['pato/auth']);
    });

    this.myInput.nativeElement.value = '';

  }
}
