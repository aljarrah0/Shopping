import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth, private userSrv: UserService) {
    // afAuth.authState.subscribe(user => {
    //   console.log(">>>>>>>>>>",user);
    //   this.user = user;
    // });
    this.user$ = afAuth.authState;
  }
  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider)
      .then((result) => console.log(result))
      .catch((err) => console.error(err.message));
  }

  loginWithTwitter() {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider)
      .then((result) => console.log(result))
      .catch((err) => console.error(err.message));
  }

  loginWithEmail() {
    this.afAuth.auth.signInWithPopup(new auth.EmailAuthProvider)
      .then((result) => console.log(result))
      .catch((err) => console.error(err.message));
  }

  loginWithGoogle() {

    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider)
      .then((result) => console.log('>>>>>>>>>>>>loginWithGoogle>>>>>>>>>>>>>>>>>>', result))
      .catch((err) => console.error(err.message));
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => console.log('signOut'))
      .catch((err) => console.error(err.message));
  }

  get AppUser$(): Observable<firebase.User> {
    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.userSrv.getUser(user.uid);
      } else {
        return Observable.of(null);
      }
    }));
  }
}
