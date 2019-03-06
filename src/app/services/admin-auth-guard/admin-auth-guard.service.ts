import { map } from 'rxjs/operators/map';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authSrv: AuthService) { }

  canActivate() {
    // get current user
   return this.authSrv.AppUser$.pipe(map((appuser: any) => appuser.isAdmin));
  }
}
