import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  @ViewChild('serverContentInput') serverContentInput!: ElementRef;
  @ViewChild('myBestBook') myBestBook!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    console.log(this.serverContentInput.nativeElement.value);
    console.log(this.myBestBook.nativeElement.textContent);
    
  }

}
