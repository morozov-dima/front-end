import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../state/users.interface';
import { map } from 'rxjs';

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
    getUserFeatureState,
    (state) => state.users
);

export const toggleEmail = createSelector(
    getUserFeatureState,
    (state) => state.displayEmail
);

export const getCurrentUserId = createSelector(
    getUserFeatureState,
    (state) => state.currentUserId
);




export const getCurrentUser = createSelector(
    getUserFeatureState,
    getCurrentUserId,
    (state, currentUserId) => {
        //in case we have no real user
        if (currentUserId === 0) {
            return {
                id: 0,
                name: '',
                username: '',
                email: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: '',
                    geo: {
                        lat: '',
                        lng: '',
                    }
                },
                phone: '054',
                website: '',
                company: {
                    name: '',
                    catchPhrase: '',
                    bs: '',
                },
                network: ''
            }
        }
        if(currentUserId) {
            // find current user according to user id
            return state.users.find(u => u.id === currentUserId)
        } else {
            return null;
        }

    }
);