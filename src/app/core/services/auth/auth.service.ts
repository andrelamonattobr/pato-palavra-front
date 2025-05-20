import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async refreshToken(): Promise<boolean> {
    let token;
    if (!isPlatformBrowser(this.platformId))
      token = null;
    else
      token = sessionStorage.getItem('refresh_token');

    if (!token) {
      throw new Error('No token to refresh');
    }

    return new Promise<boolean>((resolve) => {
      this.http.post<{token: string, refreshToken: string}>(environment.apiUrl + 'api/auth/refresh-token', {
        refreshToken: token
      }).subscribe({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)){
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("refresh_token", response.refreshToken);
          }
          resolve(true);
        },
        error: (error) => {
          console.log('Token refresh failed', error);
          resolve(false);
        }
      });
    });
  }

  logout(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (isPlatformBrowser(this.platformId)){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("password");
      }
      resolve(true);
    })
  }

  async login(username: string, password: string): Promise<boolean> {
    const response = this.http.post<{token: string, refreshToken: string}>(environment.apiUrl + 'api/auth/login', 
      {
        username: username,
        password: password
      }
    );

    return new Promise<boolean>((resolve) => {
      response.subscribe({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)){
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("refresh_token", response.refreshToken);
            sessionStorage.setItem("nickname", username);
            sessionStorage.setItem("password", password);
          }
          resolve(true);
        },
        error: (error) => {
          console.log('Login failed', error);
          resolve(false);
        }
      })
    });
  }

  async register(username: string, password: string): Promise<boolean> {
    const response = this.http.post<{token: string, refreshToken: string}>(environment.apiUrl + 'api/auth/register', 
      { 
        username: username,
        password: password 
      }
    );

    return new Promise<boolean>((resolve) => {
      response.subscribe({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)){
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("refresh_token", response.refreshToken);
            sessionStorage.setItem("nickname", username);
            sessionStorage.setItem("password", password);
          }
          resolve(true);
        },
        error: (error) => {
          console.log('Register failed', error);
          resolve(false);
        }
      })
    });
  }
  
}
