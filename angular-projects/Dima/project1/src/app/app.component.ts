import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetData } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private getData: GetData) {}
  dataSub!: Subscription;
  data: any[] = []; // TO DO add interface

  ngOnInit(): void {
      this.dataSub = this.getData.getData().subscribe(
        response => {
          console.log(response);
          this.data = response;
        }
      );
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

}
