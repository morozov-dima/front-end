import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    
  }
  
  onAddUserData() {
    // option 1
    // const userDataObj = {
    //   name: this.nameInput.nativeElement.value,
    //   amount: this.amountInput.nativeElement.value
    // };

    // option 2 (we create instance of our class)
    const userDataObj = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);

    // this.sendUserData.emit(userDataObj);
    this.shoppingListService.sendUserData.next(userDataObj);
  }

}
