import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styles: [`
  
    h1 {
      margin: 0px;
      font-size: 12px;
    }
  
  `]
  //,encapsulation: ViewEncapsulation.None
})
export class AuthorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
