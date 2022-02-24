import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, forkJoin, map, Observable, take, throwError } from 'rxjs';
import { Albums, Comments, Posts, UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }


  // Get posts data from server  
  getPosts(): Observable<Posts[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<Posts[]>(url).pipe(
      catchError(errorRes => {
        throw 'error in get posts response' + errorRes;
      })
    );
  }




  

  // get comments data from server
  getComments(): Observable<Comments[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
    return this.http.get<Comments[]>(url).pipe(
      catchError(errorRes => {
        throw 'error in get comments response' + errorRes;
      })
    );
  }


  getAlbums():Observable<Albums[]> {
    const url = 'https://jsonplaceholder.typicode.com/albums';
    return this.http.get<Albums[]>(url).pipe(
      catchError(errorRes => {
        throw 'error in get albums' + errorRes;
      })
    );
  }



  // get number of top posts method
  getTopPosts(numberOfPosts: number) {
    const topPosts = this.getPosts().pipe(
      map(responseData => {
        // we create new object that will include number of posts.
        const newPostsData: Posts[] = [];
        //we will count number of posts
        let index: number = 0;
        for (const key in responseData) {
          // if number of posts more then 'numberOfPosts' break
          if (index > numberOfPosts - 1) {
            break;
          }
          // we use SPREAD operator. we create new object 'newPostsData'
          // and push data into it
          newPostsData.push({... responseData[key]});
          index++;
        }
        return newPostsData;
      }),
      catchError(errorRes => {
        throw 'error in get top posts method' + errorRes;
      })
    );
    return topPosts;

  }








  // get number of top comments
  getTopComments(numberOfComments: number) {
    const topComments = this.getComments()
    .pipe(
      map(responseData => {
        const newComments: Comments[] = [];
        let index: number = 0;
        for (const key in responseData) {
          if (index > numberOfComments - 1) {
            break;
          }
          newComments.push({...responseData[key]});
          index++;
        }
        return newComments;
      }),
      catchError(errorRes => {
        throw 'error in get top comments method' + errorRes;
      })
    );
    
    return topComments;  
  }







  /*
   *  here we handlemultiple http requests with 'forkJoin' RXJS operator
   */
  getUserData(numberOfPosts: number, numberOfComments: number) {
    const userData: UserData[] = [];
    // get object oif top posts
    const posts$Subscription = this.getTopPosts(numberOfPosts);
    // get object of top comments
    const comments$Subscription = this.getTopComments(numberOfComments);

    // get object of albums
    const albums$Subscription = this.getAlbums();

    // create new object that include posts and comments
    // here we use 'forkJoin' RXJS operator
    const userDataObservable = forkJoin({
      posts: posts$Subscription, // data from first http request
      comments: comments$Subscription, // data from second http request
      albums: albums$Subscription // data from 'getAlbums' method (http response)
    }).pipe(
          map(dataObject => {
              // current array of objects will include data
              // from different sources.
              let userData: UserData[] = []; 
          
              // list of comments 
              for (const comment of dataObject.comments) {
                    // list of posts
                    for (const posts of dataObject.posts) {
                        for (const album of dataObject.albums) {
                          userData.push({
                            title: posts.title,
                            email: comment.email,
                            albumTitle: album.title
                          });
                          break;
                        }
                    }
                }
            
            return userData;
          })
      )

    return userDataObservable;
  }

}
