import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApartmentsService } from "./apartments-service";
import * as ApartmentAction from './apartments-actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()


export class ApartmentsEffect {
    constructor(
        private actions$: Actions,
        private apartmentsService: ApartmentsService
    ) {}


    loadApartments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ApartmentAction.loadApartments),
            mergeMap(() =>
                this.apartmentsService.getApartments().pipe(
                        map((apartments) => ApartmentAction.loadApartmentsSuccess({ apartments })),
                        catchError((error) => 
                            of(ApartmentAction.loadApartmentsFailure({ error }))
                        )
                    )
                )
        );
    }
    );


}