import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserDataService } from '../shared/user-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  numberOfProm: string = '';

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {

    this.userDataService.numberOfPromotion
    .pipe(
      map(
        (data) => {
          return `Num: ${data}`;
        }
      )
    )
    .subscribe(
      (data) => {
        this.numberOfProm = data;
      }
    );


  }

}
