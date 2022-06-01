import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {

  constructor(
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] === 0) {
        this.router.navigate(['/404']);
      }
    });
  }

  goBack() {
    // navigate to posts page
    this.router.navigate(['/posts']);
  }

}
