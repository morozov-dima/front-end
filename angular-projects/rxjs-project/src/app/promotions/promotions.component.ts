import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PromotionsModel } from '../shared/games.model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  pData: PromotionsModel[] = [];
  counter: number = 0;
 
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    
    this.pData = this.userDataService.promData;
    const numberOfPromotions = this.pData.length;
    
    this.userDataService.numberOfPromotion.next(numberOfPromotions);

    from(this.pData)
    .pipe(
      filter( data =>  data.promBonus === 'SUPER' )
    )
    .subscribe(
      (data) => {
        this.counter++;
        //console.log(data);
        
      }
    );

    
  }

}
