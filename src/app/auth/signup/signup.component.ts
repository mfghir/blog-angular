import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    public router: Router,
    public authService: AuthService
  ) {
    this.http.get('/assets/config.json').subscribe({
      next: (res: any) => {
        this.api = res.API;
      },
    });
  }

  state: string = 'ready';
  status: string = 'error';
  api: string = '';

  // user credentials
  username: string = '';
  repeatUsername: string = '';
  password: string = '';
  pic: string = '';

  setUsername(target: any): void {
    this.username = target.value;
  }
  setPassword(target: any): void {
    this.password = target.value;
  }
  setRPassword(target: any): void {
    this.repeatUsername = target.value;
  }
  setPic(target: any): void {
    this.pic = target.value;
  }

  submit(): void | string {
    if (!this.username) {
      this.state = 'error';
      return (this.status = 'enter your username.');
    }
    if (!this.password) {
      this.state = 'error';
      return (this.status = 'enter your password.');
    }
    if (!this.repeatUsername) {
      this.state = 'error';
      return (this.status = 'enter your repeated password.');
    }
    if (!this.pic) {
      this.state = 'error';
      return (this.status = 'enter your avatar url.');
    }

    this.http
      .post(
        this.api + 'user/register',
        {
          username: this.username,
          password: this.password,
          confirmPassword: this.repeatUsername,
          pic: this.pic,
        },
        {
          // withCredentials: true,
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          responseType: 'json',
        }
      )
      .subscribe({
        next: (data: any) => {
          this.authService.authState.next({ isReady: true });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.authService.authState.next({ isReady: false });

          this.state = 'error';
          if (error.error?.err?.errors) {
            // server sided error handling & validation
            this.status =
              error.error.err.errors[
                Object.keys(error.error.err.errors)[0]
              ].message;
          } else {
            this.status = error.error[Object.keys(error.error)[0]];
          }
        },
      });
  }
}
