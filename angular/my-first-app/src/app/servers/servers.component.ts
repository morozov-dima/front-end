import { Component, OnInit } from '@angular/core';

@Component({
  // select the element by attribute
  //selector: '[app-servers]',

  // select by class
  // selector: '.app-servers',


    selector: 'app-servers',

  templateUrl: './servers.component.html',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  styleUrls: ['./servers.component.css']
  // styles: [
  //   `
  //     .test{
  //     color:blue;
  //     }
  //   `
  // ]
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
