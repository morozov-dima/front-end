import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

import {map} from 'rxjs/operators';
import { LocationsService } from '../locations.service';

/*
    Angular Asynchronous Form Validator.
*/
export function uniqueLocationNameAsynchronousValidator(locations: LocationsService):AsyncValidatorFn  {
    return (control: AbstractControl) => {
        return locations.getSavedLocations()
            .pipe(
                map(locations => {
                    const location = locations.find(location => location.name.toLowerCase() == control.value.toLowerCase());
                    return location ? {locationExists:true} : null;
                })
            )

    }
}
