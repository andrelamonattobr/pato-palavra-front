import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(): MaybeAsync<GuardResult> {
    if (sessionStorage.getItem("token"))
      return true;
    this.router.navigate(['pato/auth']);
    return false;
  }
  
}
