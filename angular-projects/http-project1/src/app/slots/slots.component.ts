import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Posts } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit, OnDestroy {

  postsItems: Posts[] = [];
  userDataSubscription!: Subscription;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.getPosts().subscribe(posts => {
      this.postsItems = posts;
    });
  }

  ngOnDestroy(): void {
      this.userDataSubscription.unsubscribe();
  }

}
