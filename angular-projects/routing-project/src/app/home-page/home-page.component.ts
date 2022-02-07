import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  text: string = '';
  pageType: string = 'hp';
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.text = this.userDataService.getPageData(this.pageType);
  }

}
