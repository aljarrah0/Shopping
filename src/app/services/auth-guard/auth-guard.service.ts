import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authSrv: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot) {
    return this.authSrv.user$.pipe(map(user => {
      if (user) { return true; } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
          .then(() => console.log('>>>>>NAVIGATE>>>>TRUE'))
          .catch((err) => console.error(err.message));
      }
    }));
  }
}
