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

<button (click)="onDeleteEmployee(row.id)" mat-icon-button color="warn">
<mat-icon>delete</mat-icon>
</button>




<div class="icon-wrapper">
<mat-icon class="add-location-to-history-icon" (click)="openDialog()">add_circle</mat-icon>
</div>
