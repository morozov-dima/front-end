import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { HandleErrorService } from '../../shared/services/error.service';
import { ISSLocationFromAPI } from "./maps.interface";


@Injectable({
    providedIn: 'root'
})

export class MapsService {
    constructor( private http: HttpClient, private handleErrorService: HandleErrorService ) {}

    getMaps(): Observable<ISSLocationFromAPI> {
        const url = 'http://api.open-notify.org/iss-now.json';
        return this.http.get<ISSLocationFromAPI>(url)
            .pipe(
                map((response) => {
                    const updatedResponse: ISSLocationFromAPI = {
                        iss_position: {
                            longitude: response.iss_position.longitude,
                            latitude: response.iss_position.latitude,
                        },
                        timestamp: response.timestamp,
                        message: response.message
                    };
                    return updatedResponse;
                }),
                catchError(this.handleErrorService.handleError)
            );
    }


}