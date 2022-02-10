import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  id: number = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params: Params) => {
        this.id = parseInt(params['id']); // convert string to number
      }
    );

  }

}
