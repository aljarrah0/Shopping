import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping';

  constructor(private authSrv: AuthService, private route: ActivatedRoute, private router: Router, private userSrv: UserService) {
    this.authSrv.user$.subscribe(user => {
      if (user) {
        this.userSrv.save(user);
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl'));
      }
    });
  }
}
