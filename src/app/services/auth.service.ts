import { Injectable, OnInit, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    if (window.localStorage.getItem('username')) {
      let username: any = window.localStorage.getItem('username');
      let pic: any = window.localStorage.getItem('pic');
      this.authState.next({
        username,
        pic,
        isReady: true,
      });
    }
  }

  public auth: Auth = {
    isReady: false,
  };

  public authState: BehaviorSubject<Auth> = new BehaviorSubject(this.auth);
}
