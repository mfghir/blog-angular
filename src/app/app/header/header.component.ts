import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public configService: ConfigService,
    public http: HttpClient,
    public router: Router
  ) {
    this.http.get('/assets/config.json').subscribe({
      next: (res: any) => {
        this.api = res.API;
      },
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe({
      next: (auth: Auth) => {
        this.isLoggedIn = auth.isReady;
        auth.isReady && (this.username = auth.username);
        auth.isReady && (this.pic = auth.pic);
      },
    });
  }

  isLoggedIn: boolean = false;
  username: string | undefined;
  pic: string | undefined;
  api: string = '';

  logout() {
    this.http.post(this.api + 'user/logout', {}).subscribe({
      next: () => {
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('pic');
        this.authService.authState.next({ isReady: false });
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
