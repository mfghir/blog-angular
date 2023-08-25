import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  constructor(public http: HttpClient) {
    this.http.get('/assets/config.json').subscribe({
      next: (res: any) => {
        this.api = res.API;
      },
    });
  }

  state: string = 'ready';
  status: string = '';
  results: any = [];
  api: string = '';

  // search input
  searchString: string = '';

  setSearchString(target: any) {
    this.searchString = target.value;
  }

  search() {
    // retrieve posts
    this.http
      .get(this.api + 'search/post?data=' + this.searchString)
      .subscribe({
        next: (res: any) => {
          this.results = res;
          this.state = 'ready';
          console.log(res);
        },
        error: (error) => {
          this.state = 'error';
          this.status = error.error[Object.keys(error.error)[0]];
        },
      });
  }
}
