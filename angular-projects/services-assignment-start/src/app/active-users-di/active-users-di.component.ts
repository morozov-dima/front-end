import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CounterService } from '../shared/counter.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-active-users-di',
  templateUrl: './active-users-di.component.html',
  styleUrls: ['./active-users-di.component.css']
})
export class ActiveUsersDiComponent implements OnInit {
  usersDI: string[];
  constructor(private usersService: UsersService, private counterService: CounterService) { }

  ngOnInit(): void {
    this.usersDI = this.usersService.activeUsersDI;
  }


  onSetToInactiveDI(id: number) {
    this.usersService.onSetToInactiveDI(id);
  }


}
