import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";



import { booksReducer } from "./state/books.reducer";
import { collectionReducer } from "./state/collection.reducer";
import { commentsReducer } from './comments/store/comments.reducer';


import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookCollectionComponent } from "./book-collection/book-collection.component";

// ********* NgRx Store ***********
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { CommentsComponent } from './comments/comments.component';
// ********* NgRx Store ***********

@NgModule({
  imports: [
    BrowserModule,

    // ********* NgRx Store ***********
    StoreModule.forRoot(
      { 
        books: booksReducer,
        collection: collectionReducer,
        comments: commentsReducer
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    // ********* NgRx Store ***********

    HttpClientModule,
  ],
  declarations: [
    AppComponent, 
    BookListComponent, 
    BookCollectionComponent, CommentsComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
