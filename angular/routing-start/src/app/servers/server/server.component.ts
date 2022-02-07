import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    /* // option 1 - with a resolver */
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );




    // /* // option 2 */
    // // we get id as string and we need convert it to number. we will use "+" for this.
    // const id = +this.route.snapshot.params['id']; 
   
    // // console.log(this.route.snapshot.queryParams);
    // // console.log(this.route.snapshot.fragment);
    
    // this.server = this.serversService.getServer(id);
    
    // // if we also want to react to any changes thereafter.
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']); 
    // });
  }





  onEdit() {
     this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }


}
