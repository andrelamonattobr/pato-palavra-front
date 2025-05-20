import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  async getPersonalScore(): Promise<{nickname: string;attemptId: number; points: number}[]>{
    const nickname = isPlatformBrowser(this.platformId) ? sessionStorage.getItem("nickname") : "";
    const password = isPlatformBrowser(this.platformId) ? sessionStorage.getItem("password") : "";
    
    const response = this.http.post<{
      success: boolean;
      message: string;
      entries: {
        nickname: string;
        attemptId: number;
        points: number
      }[]
    }>(environment.apiUrl + 'api/scoreboard/personal', {nickname, password});

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
    const nickname = isPlatformBrowser(this.platformId) ? sessionStorage.getItem("nickname") : "";
    const password = isPlatformBrowser(this.platformId) ? sessionStorage.getItem("password") : "";
    
    const response = this.http.post<{
      success: boolean;
      message: string;
    }>(environment.apiUrl + "api/words/register", {nickname, password, word});

    return new Promise<{success: boolean; message: string}>((resolve, reject) => {
      response.subscribe({
        next: (response) => {resolve(response);},
        error: (error) => {reject(error);}
      });
    });
  }
}
