import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {


  games: {gameName: string, gamePrice: number, active: number}[] = [
    {
      gameName: 'game 10',
      gamePrice: 10,
      active: 1
    },
    {
      gameName: 'game 20',
      gamePrice: 20,
      active: 1
    },
    {
      gameName: 'game 30',
      gamePrice: 30,
      active: 1
    },
    {
      gameName: 'game 40',
      gamePrice: 40,
      active: 0
    },
    {
      gameName: 'game 50',
      gamePrice: 50,
      active: 1
    },
    {
      gameName: 'game 60',
      gamePrice: 60,
      active: 0
    },
    {
      gameName: 'game 70',
      gamePrice: 70,
      active: 1
    }
  ];


  constructor() { 
    
  }




  // get number of active games  
  getNumberOfActiveGames(): number {
    let numberOfActiveUsers: number = 0;
    for (const game of this.games) {
        if(game.active === 1) {
          numberOfActiveUsers++;
        }  
    }
    return numberOfActiveUsers;
  }



  // get game name with big price
  getGameNameWithBigPrice(): number {
    let bigPrice: number = 0;
    this.games.forEach(game => {
      if(game.gamePrice > bigPrice) {
        bigPrice = game.gamePrice;
      }
    });
    return bigPrice;
  }



  getTopGames(numberOfTopGames: number) :string[] {
    let topGames: string[] = [];
    let bigPrice: number = this.games[0].gamePrice; // get first price
    let gameName: string = '';

    for (let i = 0; i < numberOfTopGames; i++) {
      let i: number = 0;
      for (const game of this.games) {
        if(game.gamePrice > bigPrice && topGames.indexOf(game.gameName) === -1) {
          bigPrice = game.gamePrice;
          gameName = game.gameName;
        }
        i++;
      }
   
      topGames.push(gameName);
      gameName = '';
      bigPrice = 0;
    }
    return topGames;
  }


  
  // Get random game name from object
  getRandomGame(): string {
     const randomNum = this.getRandomInt(0, this.games.length);
     let i: number = 0;
     let res: string = '';
    
    this.games.forEach(game => {
      if (randomNum === i) {
         res = game.gameName;
      }
      i++; 
    });
    return res;
  }




  // Getting a random integer between two values
  private getRandomInt(min: number, max: number): number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }



  // Get game name with lowest price
  getGameNameWithLowestPrice(): string {
    let lowestPrice: number = this.games[0].gamePrice;
    let gameNameWithLowestPrice: string = this.games[0].gameName;
    
    this.games.forEach(game => {
      if (game.gamePrice < lowestPrice) {
        lowestPrice = game.gamePrice;
        gameNameWithLowestPrice = game.gameName;
      }
    });
    
    return gameNameWithLowestPrice;
  }
}
