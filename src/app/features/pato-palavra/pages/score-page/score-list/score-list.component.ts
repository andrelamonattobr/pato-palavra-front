import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ScoreItem {
  username: string;
  attemptId: number;
  points: number;
}

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ScoreListComponent {
  @Input() items: ScoreItem[] = [];
} 