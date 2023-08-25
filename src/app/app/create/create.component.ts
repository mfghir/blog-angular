import { HttpClient } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
} from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements AfterViewChecked {
  constructor(public http: HttpClient, public router: Router) {
    this.http.get('/assets/config.json').subscribe({
      next: (res: any) => {
        this.api = res.API;
      },
    });

    this.Editor.defaultConfig.image = { toolbar: ['false'] };
  }

  ngAfterViewChecked(): void {
    // to remove the image button from editor
    !this.isImageRemoved &&
      document.getElementsByClassName('ck ck-button ck-off')[6].remove();
    this.isImageRemoved = true;
  }

  state: string = 'ready';
  status: string = 'ok';
  api: string = '';
  isImageRemoved: boolean = false;
  public Editor = ClassicEditor;

  // posts
  title: string = '';
  descritption: string = '';
  content: string = '';
  pic: string = '';

  setTitle(event: any) {
    this.title = event.value;
  }
  setDesc(event: any) {
    this.descritption = event.value;
  }
  setPic(event: any) {
    this.pic = event.value;
  }

  public onChange(editor: any) {
    this.content = editor.editor.getData();
  }

  submit() {
    this.http
      .post(
        this.api + 'post/create',
        {
          title: this.title,
          content: this.content,
          description: this.descritption,
          pic: this.pic,
        },
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: (results: any) => {
          this.state = 'ready';
          this.router.navigate(['/']);
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
  }
}
