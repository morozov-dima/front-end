// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************

/*
    1. https://material.angular.io/components/icon/overview
    2. https://fonts.google.com/icons?icon.query=edit from 'Inserting the icon' copy name,
       for example 'edit_note' or 'delete'
    3. list of all icons: https://fonts.google.com/icons   
*/




// ********************** app.component.html *************************
<mat-icon (click)="onDeletePhoto(element.id)" class="delete-action">
    delete
</mat-icon>


<mat-icon class="add-location-to-history-icon" (click)="openDialog()">
    add_circle
</mat-icon>





// ********************** app.component.css *************************
.delete-action {
    color:red;
    cursor: pointer;
}



