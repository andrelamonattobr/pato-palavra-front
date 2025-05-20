import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): MaybeAsync<GuardResult> 
  {
    if (!isPlatformBrowser(this.platformId))
      return false;
    if (sessionStorage.getItem("token"))
      return true;
    this.router.navigate(['pato/auth']);
    return false;
  }
  
}
