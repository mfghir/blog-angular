import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [],
})
export class LoadingComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.maxWidth = document
      .getElementById(this.randId.toString())!
      .getBoundingClientRect().width;

    let bar = document.getElementById((this.randId + 1).toString());

    setInterval((): void | number => {
      if (this.x > this.maxWidth) return (this.x = -this.width);
      this.x += 2;

      bar!.style.translate = `${this.x}px`;
    }, 10);
  }

  @Input('width') width: number = 75;
  maxWidth: number = 0;
  randId: number = Math.round(Math.random());
  x: number = -75;
}
