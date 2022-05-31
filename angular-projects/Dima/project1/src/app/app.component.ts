import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  text: string = '';
  highlights: any[] = [];

  ngOnInit(): void {
      this.text = ' DimaMorozovJSAngularCSS';
      this.highlights = [
        {
            from: 2,
            to: 4
        },
        {
            from: 6,
            to: 9
        }
    ];
  }
}
