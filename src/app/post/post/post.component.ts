import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: [],
})
export class PostComponent implements OnInit {
  constructor(public http: HttpClient, public activatedRoute: ActivatedRoute) {
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.http.get('/assets/config.json').subscribe({
      next: (res: any) => {
        this.api = res.API;

        // retrieve data
        this.http.get(this.api + 'single/post/' + this.postId).subscribe({
          next: (res: any) => {
            this.post = res;
            this.state = 'ready';
          },
        });
      },
    });
  }

  api: string = '';
  postId: string = '';
  post: Post | null = null;
  state: string = 'loading';
}
