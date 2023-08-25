import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button1',
  templateUrl: './button1.component.html',
  styles: [],
})
export class Button1Component {
  @Input('title') title: string = '';
}
