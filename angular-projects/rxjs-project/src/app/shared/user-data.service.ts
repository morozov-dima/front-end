import { Injectable, OnInit } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { GamesModel, PromotionsModel } from './games.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements OnInit {

  numberOfPromotion = new Subject<number>();


  promData: PromotionsModel[] = [
    {
      promImage: 'https://via.placeholder.com/300x100/015665',
      promLongText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry - 1',
      promTitle: 'Lor - 1',
      promShortText: 'Lorem Ipsum is simply lorem Ipsum is simply dummy - 1',
      promBonus: 'SUPER'
    },
    {
      promImage: 'https://via.placeholder.com/300x100/015000',
      promLongText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry - 2',
      promTitle: 'Lorem Ipsum is simply - 1',
      promShortText: 'Lorem Ipsum is simply lorem Ipsum is simply dummy - 2',
      promBonus: 'ssdddddd'
    },
    {
      promImage: 'https://via.placeholder.com/300x100/e3e3e3',
      promLongText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry - 3',
      promTitle: 'Lorem Ipsum is simply - 1',
      promShortText: 'Lorem Ipsum is simply lorem Ipsum is simply dummy - 3',
      promBonus: 'SUPER'
    },
    {
      promImage: 'https://via.placeholder.com/300x100/e9e9e3',
      promLongText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry - 4',
      promTitle: 'Lorem Ipsum is simply - 1',
      promShortText: 'Lorem Ipsum is simply lorem Ipsum is simply dummy - 4',
      promBonus: 'ss3389899'
    },
    {
      promImage: 'https://via.placeholder.com/300x100/4f4f4f',
      promLongText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry - 5',
      promTitle: 'Lorem Ipsum is simply - 1',
      promShortText: 'Lorem Ipsum is simply lorem Ipsum is simply dummy - 5',
      promBonus: 'SUPER'
    }
  ];

  


    gamesTop: GamesModel[] = [
      {
        gameName: 'Game sdsS23d',
        gameText: 'Lorem Ipsum is - 1',
        gamePrice: 10
      },
      {
        gameName: 'Game sdsddd',
        gameText: 'Lorem Ipsum is - 2',
        gamePrice: 104
      },
      {
        gameName: 'Game sdsaqqqw',
        gameText: 'Lorem Ipsum is - 3',
        gamePrice: 199
      },
      {
        gameName: 'Game sdooo9',
        gameText: 'Lorem Ipsum is - 4',
        gamePrice: 55
      },
      {
        gameName: 'Game sdsss',
        gameText: 'Lorem Ipsum is - 5',
        gamePrice: 5
      }
    ];


    games: GamesModel[] = [
      {
        gameName: 'Game sdsS23d',
        gameText: 'Lorem Ipsum is - 1',
        gamePrice: 10
      },
      {
        gameName: 'Game sdsddd',
        gameText: 'Lorem Ipsum is - 2',
        gamePrice: 104
      },
      {
        gameName: 'Game sdsaqqqw',
        gameText: 'Lorem Ipsum is - 3',
        gamePrice: 199
      },
      {
        gameName: 'Game sdooo9',
        gameText: 'Lorem Ipsum is - 4',
        gamePrice: 55
      },
      {
        gameName: 'Game sdsss',
        gameText: 'Lorem Ipsum is - 5',
        gamePrice: 5
      }
    ];







  constructor() {

  }



  ngOnInit(): void {
      
  }


  mergeGamesData() {
    const gamesData = merge(this.gamesTop, this.games);
    return gamesData;
  }


}
