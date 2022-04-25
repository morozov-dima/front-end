import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";




interface Todos {
    userId: number;
    id: number;
    title: string;
    completed: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    constructor(private http: HttpClient) {}


    getTop3Users() {
        
        const url = 'https://jsonplaceholder.typicode.com/todos/?_limit=10';
        const httpOptions = {
            headers: new HttpHeaders({
                'key': 'DGDFDFDUIOILJGHDGRR4545454'
            })
        };
        return this.http.get<Todos[]>(url, httpOptions).pipe(
            // ************** get top 3 users **************
            map((usersData) => {
                // list of top 3 users
                const usersDataTop3: Todos[] = []; 

                // we will compare each user id with this value
                let currentIndex: number = 0;

                // in this empty array we will save list of indexes
                let listOfIndexes: number[] = [];
   
                // loop over top 3 users
                for (let index = 0; index < 3; index++) {
                    // loop over array of objects
                    for (const userData of usersData) {
                        // if current user id bigger that 'currentIndex'
                        // or this user already appear in our 'listOfIndexes' array.
                        if((userData.id > currentIndex) && (listOfIndexes.indexOf(userData.id) === -1)) {
                            currentIndex = userData.id;
                        }
                    }
        
                    // add big index to 'listOfIndexes' array
                    listOfIndexes.push(currentIndex)
                
                    // find current object from array of objects according to 'currentIndex'
                    let getUserDataByIndex: any = usersData.find(el => el.id === currentIndex );

                    // add object with big id to output array.
                    usersDataTop3.push(getUserDataByIndex);

                    currentIndex = 0;
                }

                // return new updated array of objects
                return usersDataTop3;
            })
        );
    }

}