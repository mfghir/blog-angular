import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: [],
})
export class PostsComponent {
  constructor(public http: HttpClient) {
    this.http.get('/assets/config.json').subscribe({
      next: (res: any) => {
        this.api = res.API;

        // retrieve posts
        this.http.get(this.api + 'posts', { withCredentials: true }).subscribe({
          next: (res: any) => {
            this.results = res;
            this.state = 'ready';
            console.log(res);
          },
          error: (error) => {
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
      },
    });
  }

  state: string = 'loading';
  status: string = 'ok';
  results: any = [{}, {}, {}, {}, {}, {}];
  api: string = '';
}
