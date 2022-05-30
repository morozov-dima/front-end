import {Component, OnInit} from '@angular/core';
import {PostsService} from './posts.service';

@Component({
  template: `Posts component`,
  selector: 'app-posts'
})

export class PostsComponent implements OnInit {
  posts: any[] = [];
  message: string= '';

  constructor(private service: PostsService) {}

  ngOnInit(): void {
    // fetch (get) data from srvice
    this.service.fetch().subscribe({
      next: (response) => {
       this.posts = response;
      },
      error: (err) => {
        this.message = err;
      }
    })
  }
  

  // add data to service
  add(title: string) {
    const post = { title };
    this.service.create(post).subscribe({
      next: (p) => {
        this.posts.push(p);
      },
      error: (err) => {
        this.message = err;
      }
    });
  }


  delete(id: number) {
    if (window.confirm('Are you sure?')) {
      this.service.remove(id).subscribe();
    }
  }
}
