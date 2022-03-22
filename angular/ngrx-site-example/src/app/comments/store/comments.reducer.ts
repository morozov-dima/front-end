import { createReducer, on } from '@ngrx/store';

import { retrievedBookList } from './comments.action';
import { Book } from '../../book-list/books.model';

export const initialState: ReadonlyArray<Book> = [];

export const commentsReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => books)
);

