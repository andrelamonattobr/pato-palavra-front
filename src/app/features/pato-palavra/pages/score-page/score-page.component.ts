import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ScoreListComponent } from './score-list/score-list.component';
import { GameService } from '../../../../core/services/game/game.service';

@Component({
  selector: 'app-score-page',
  imports: [ScoreListComponent],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss'
})
export class ScorePageComponent implements OnInit {
  personalScores: { nickname: string; attemptId: number; points: number; }[] = [];
  leaderboardScores: { nickname: string; attemptId: number; points: number; }[] = [];

  constructor(private authService: AuthService, private router: Router, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.getPersonalScore().then(result => {
      this.personalScores = result;
    }).catch(err => {
      this.authService.logout();
      this.router.navigate(['pato/auth']);
    });

    this.gameService.getLeaderboard().then(result => {
      this.leaderboardScores = result
    }).catch(err => {
      this.authService.logout();
      this.router.navigate(['pato/auth']);
    });

  }
  
  logout() {
    typeof(window) != undefined ? sessionStorage.removeItem("token") : null;
    this.router.navigate(['pato/auth']);
  }

  main() {
    this.router.navigate(['pato']);
  }
}
