import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {
  text: string = '';
  pageType: string = 'games';

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.text = this.userDataService.getPageData(this.pageType);
  }

}
