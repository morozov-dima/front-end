import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-content-projection',
  templateUrl: './content-projection.component.html',
  styleUrls: ['./content-projection.component.css']
})
export class ContentProjectionComponent implements OnInit, AfterContentChecked {
  newItems: any[] = [];
  newItems2: any[] = [];
  
  items: any[] = [
    {
      title: 'Post 1', 
      author: 'Vladilen', 
      comments: [
        {
          name: 'Max', 
          text: 'lorem1'
        },
        {
          name: 'Max',
          text: 'lorem2'
        },
        {
          name: 'Max',
          text: 'lorem3'
        }
      ]
    },
    {
      title: 'Post 2', 
      author: 'Vladilen', 
      comments: [
        {
          name: 'Max 2', 
          text: 'lorem1'
        },
        {
          name: 'Max 2',
          text: 'lorem2'
        },
        {
          name: 'Max 2',
          text: 'lorem3'
        }
      ] 
    }
  ];


  constructor() { }

  ngOnInit(): void {
    for (const item of this.items) {
      for (const internalItem of item.comments) {
        this.newItems.push(
            {
              newName: internalItem.name,
              newTitle: internalItem.text
            }
          );
      }
    }

    this.newItems2 = [...this.newItems];  // Deep Cloning Objects/Arrays with "Spread syntax".
    //this.newItems2 = this.newItems;     // Copy objects (same object updated)
    this.newItems.push({newName: 'Max 3', newTitle2: 'Lorem4'});
    
    
    console.log(this.newItems2, this.newItems);
    


    

  }

  ngAfterContentChecked() : void {
  }

}
