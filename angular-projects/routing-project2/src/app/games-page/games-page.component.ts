import { Component, OnInit } from '@angular/core';
import { UsedDataService } from '../shared/used-data.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {
  pageType: string = 'games';

  constructor(private usedDataService: UsedDataService) { }

  ngOnInit(): void {
    this.usedDataService.getPageTests(this.pageType);
  }

}
