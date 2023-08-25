//
// @@ Module is deprecated @@
//

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(public http: HttpClient) {
    this.http.get('/assets/config.json').subscribe({
      next: (res: any) => {
        this.api.next(res.API);
      },
    });
  }

  api: Subject<string> = new Subject();
}
