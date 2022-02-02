import { Component, OnInit } from '@angular/core';
import { GamesService } from '../shared/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: {gameName: string, gamePrice: number, active: number}[];
  activeGames: number = 0;
  gameHighestPrice: number = 0;
  highestGames: string[] = [];
  randomGame: string = '';
  numberOfTopGames: number = 3;
  gameWithLowestPrice: string = '';

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.games = this.gamesService.games;
    this.activeGames = this.gamesService.getNumberOfActiveGames();
    this.gameHighestPrice = this.gamesService.getGameNameWithBigPrice();

    // get top 3 games from the list of games
    this.highestGames = this.gamesService.getTopGames(this.numberOfTopGames);

    // display random game name
    this.randomGame = this.gamesService.getRandomGame();

    // get game lowest Price
    this.gameWithLowestPrice = this.gamesService.getGameNameWithLowestPrice();

  }

}
