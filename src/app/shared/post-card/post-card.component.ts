import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styles: [],
})
export class PostCardComponent {
  @Input('post') post: Post | null = null;
}
