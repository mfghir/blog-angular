import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { Input1Component } from './input1/input1.component';
import { Button1Component } from './button1/button1.component';
import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  declarations: [
    LoadingComponent,
    Input1Component,
    Button1Component,
    PostCardComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    Input1Component,
    Button1Component,
    PostCardComponent,
  ],
})
export class SharedModule {}
