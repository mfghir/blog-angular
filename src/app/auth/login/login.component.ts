import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
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
  password: string = '';

  setUsername(target: any): void {
    this.username = target.value;
  }
  setPassword(target: any): void {
    this.password = target.value;
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

    this.http
      .post(
        this.api + 'user/login',
        {
          username: this.username,
          password: this.password,
        },
        {
          withCredentials: true,
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          responseType: 'json',
        }
      )
      .subscribe({
        next: (data: any) => {
          let { username, pic } = data;
          this.authService.authState.next({ isReady: true, username, pic });
          window.localStorage.setItem('username', username);
          window.localStorage.setItem('pic', pic);
          this.router.navigate(['/']);
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
