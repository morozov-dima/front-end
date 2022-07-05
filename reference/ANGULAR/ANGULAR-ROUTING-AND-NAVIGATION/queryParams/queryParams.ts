// ************************************************************
// ************************* Example 1 ************************
// ************************************************************


// ****************** user-data.component.ts ******************
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent implements OnInit {
  constructor( private route: ActivatedRoute ) { }
  aTracker: string = '';
  bTracker: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.aTracker = params['a'];
      this.bTracker = params['b'];
    });
  }
}

