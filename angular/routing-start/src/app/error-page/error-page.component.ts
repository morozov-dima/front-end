import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string; // will be undefined by default

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // /* option 1 */
    //this.errorMessage = this.route.snapshot.data['message'];

    // /* option 2 - if this could possible change while you still are on this page. */
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

}
