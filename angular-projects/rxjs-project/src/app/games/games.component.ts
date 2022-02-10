import { Component, OnInit } from '@angular/core';
import { GamesModel } from '../shared/games.model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  currentGamesData: GamesModel[] = [];

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    const gamesData = this.userDataService.mergeGamesData();
    gamesData
    .subscribe( 
      (data) => {
         this.currentGamesData.push(data);
     });
    
    console.log(this.currentGamesData);
    

  }


    

  


}
