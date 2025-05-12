import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {
  showLogin: boolean = true; // Default to showing login form

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  async login(username: string, password: string){
    await this.authService.login(
      username,
      password
    ).then((result) => {
      if (result){
        this.router.navigate(['pato']);
      }else{
        this.authService.logout();
      }
    });
    
  }

  async register(username: string, password: string){
    await this.authService.register(
      username,
      password
    ).then((result) => {
      if (result){
        this.router.navigate(['pato']);
      }else{
        this.authService.logout();
      }
    });
  }

}
