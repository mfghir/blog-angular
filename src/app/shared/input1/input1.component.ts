import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input1',
  templateUrl: './input1.component.html',
  styles: [],
})
export class Input1Component {
  @Input('type') type: string = 'text';
  @Input('name') name: string = '';
  @Input('placeholder') placeholder: string = '';
}
