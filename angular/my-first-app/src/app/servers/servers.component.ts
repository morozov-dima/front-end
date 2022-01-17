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
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created!';
  serverName: string = 'Test server';
  serverCreated: boolean = false;
  servers: string[] = ['Testserver', 'Testserver 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  
  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
    
  }


}
