import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  async getPersonalScore(): Promise<{nickname: string;attemptId: number; points: number}[]>{
    const response = this.http.post<{
      success: boolean;
      message: string;
      entries: {
        nickname: string;
        attemptId: number;
        points: number
      }[]
    }>(environment.apiUrl + 'api/scoreboard/personal', {nickname: sessionStorage.getItem("nickname"), password: sessionStorage.getItem("password")});

    return new Promise<{nickname: string; attemptId: number; points: number}[]>((resolve, reject) => {
      response.subscribe({
        next: (response) => {resolve(response.entries);},
        error: (error) => {reject(error);}
      });
    });
    
  }

  async getLeaderboard(): Promise<{nickname: string; attemptId: number; points: number}[]> {
    const response = this.http.get<{
      success: boolean;
      message: string;
      entries: {
        nickname: string;
        attemptId: number;
        points: number
      }[]
    }>(environment.apiUrl + 'api/scoreboard/general');
    
    return new Promise<{nickname: string; attemptId: number; points: number}[]>((resolve, reject) => {
      response.subscribe({
        next: (response) => {resolve(response.entries);},
        error: (error) => {reject(error);}
      });
    });
  }


  async sendWord(word: string): Promise<{success: boolean; message: string}> {
    const response = this.http.post<{
      success: boolean;
      message: string;
    }>(environment.apiUrl + "api/words/register", {nickname: sessionStorage.getItem("nickname"), password: sessionStorage.getItem("password"), word: word});

    return new Promise<{success: boolean; message: string}>((resolve, reject) => {
      response.subscribe({
        next: (response) => {resolve(response);},
        error: (error) => {reject(error);}
      });
    });
  }
}
