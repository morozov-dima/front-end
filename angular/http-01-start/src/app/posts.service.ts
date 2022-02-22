import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    error = new Subject<string>();

    constructor(private http: HttpClient) {}



    /*
    *  We 'send' data to the server with 'post' method to FireBase.
    */
    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content}; 
        const url = `https://ng-complete-guide-2aa44-default-rtdb.firebaseio.com/posts.json`;

         // send Http request
         // we add '<{ name: string }>' after post method, this is recommended
         // and helpful about the data you are getting back.
         this.http.post<{ name: string }>(
             // the URL (first parameter)
             url, 
             // request body (second parameter), data that we send to server.
             postData,
             {
               // observe: 'body' // this is default
                observe: 'response' // this is how we observe the response
             } 
          // we can also subscribe in our service.   
          ).subscribe(responseData => { 
            console.log(responseData);

            // if we set observe: 'response' , we can access our responseData.body
            // we can also access to status code like status: 200
            // we can access to statusText (header information)
             console.log(responseData.body);
             console.log(responseData.status);
             console.log(responseData.statusText);
             
            
          }, error => {
            // show system error message,  we can also show our own error message.
            this.error.next(error.message);
          });
    }







    /*
    *  We delete data from the server with 'delete' method.
    */
    deletePost() {
      const url = `https://ng-complete-guide-2aa44-default-rtdb.firebaseio.com/posts.json`;
      return this.http.delete(
          url,
          {
            // observe: 'body' // this is default
            observe: 'events',
            responseType: 'json' // json is a default 

            /* ********* response type text **********  */
            // you can also set responseType to text.
            // don't try to convert it to JavaScript object.
            // responseType: 'text' // response type will  be text

            
            /* ********* response type blob **********  */
            // response type can also be 'blob' if it is a file.
            // responseType: 'blob' // response type will  be blob (if we get file in response)
          }
        )
        .pipe(
          // this operator allows us to execute some code without altering the response.
          tap(event => {
            console.log(event);

            if (event.type === HttpEventType.Sent) {
              //  Update your UI              
            }

            if (event.type === HttpEventType.Response) {
              console.log(event.body);
              
            }
          }) 
        );
    }







    /*
    *  We 'get' data from the server with the 'get' method from Firebase.
    *  Here we use observable operators to transform our data.
    *  In this example we get object from Firebase and we want convert it to array of objects. 
    *  Our method retuen Observable of type Post[]
    */
    fetchPosts(): Observable<Post[]> {
      const url = `https://ng-complete-guide-2aa44-default-rtdb.firebaseio.com/posts.json`;

      // you can also set multiple params
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');


      const httpOptions = {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello'
        }),

        // for single param
        // result will be:
        // https://ng-complete-guide-2aa44-default-rtdb.firebaseio.com/posts.json?print=pretty
        // params: new HttpParams().set('print', 'pretty') 

        // for miltiple params
        // result will be:
        // https://ng-complete-guide-2aa44-default-rtdb.firebaseio.com/posts.json?print=pretty&custom=key
           params: searchParams 
      };




      // send Http request
      // type that we will return is : { [key: string]: Post }
      return this.http.get<{ [key: string]: Post }>(
          url,
          httpOptions
         )
        .pipe(
            // the map operator allows us to get some data and return new data
            // which is then automatically re-wrapped onto an observable,
            // so we can still subscribe to it.
            // our map function get 'responseData' and return the converted 'responseData'.
            // we get object 'responseData' and we want convert it to array of objects.
            map(responseData => { 
              const postsArray: Post[] = [];
                // we will manually loop through all the keys and create a new array.
                // 'responseData' is an object that we get from server.
                // and then I want to push each piece of data into my posts array.
                // here we use 'for in' loop . this is 'for' for objects (key - value)
                for (const key in responseData) {
                    // it is a good practice to wrap this with an if statement, 
                    // where you check if response data has key as its own property.
                    if (responseData.hasOwnProperty(key)) {
                      // we want to push new object in there, and we will use
                      // SPREAD operator now.
                      // and this now allows me to also add one new key-value pair to that
                      // object and it will be 'id' field.
                      // key is a unique ID generated by Firebase.
                      // we need some id , if we want to delete some post.
                      postsArray.push({ ...responseData[key], id: key });
                    }
                }
                // we return an array of objects
                return postsArray; 
            }),
            // Using the catchError Operator
            catchError(errorRes => {
              // Send to analytics server
              return throwError(errorRes);
            })
        )
    }





}