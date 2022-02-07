import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-slot-game',
  templateUrl: './slot-game.component.html',
  styleUrls: ['./slot-game.component.css']
})
export class SlotGameComponent implements OnInit {
  id: number = 0;
  name: string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.name = params['name'];
      });


    
  }

}
