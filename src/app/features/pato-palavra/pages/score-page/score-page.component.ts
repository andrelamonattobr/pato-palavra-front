import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ScoreListComponent } from './score-list/score-list.component';
import { GameService } from '../../../../core/services/game/game.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-score-page',
  imports: [ScoreListComponent],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss'
})
export class ScorePageComponent implements OnInit {
  personalScores: { username: string; attemptId: number; points: number; }[] = [];
  leaderboardScores: { username: string; attemptId: number; points: number; }[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private gameService: GameService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    /*this.gameService.getPersonalScore().then(result => {
      this.personalScores = result;
    }).catch(err => {
      this.authService.logout();
      this.router.navigate(['pato/auth']);
    });*/

    this.gameService.getLeaderboard().then(result => {
      this.leaderboardScores = result
    }).catch(err => {
      this.authService.logout();
      this.router.navigate(['pato/auth']);
    });

  }
  
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem("token");
    }
    this.router.navigate(['pato/auth']);
  }

  main() {
    this.router.navigate(['pato']);
  }
}
