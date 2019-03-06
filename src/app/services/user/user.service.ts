import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
    });
  }

  getUser(uid: string) {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
