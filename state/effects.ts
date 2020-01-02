import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EMPTY} from 'rxjs';
import {catchError, tap, withLatestFrom} from 'rxjs/operators';
import { nextPageSuccess, nextPageFailure } from "./actions";
import { Store, select } from '@ngrx/store';
import { AppState } from '../app/state';

@Injectable()
export class PeopleEffects {

    nextPage$ = createEffect(() => this.actions$.pipe(
      ofType('[Home Page] Next Page Request'),
      withLatestFrom(this.store$.pipe(select<AppState, 'people'>('people'))),
        switchMap(([action, state]) => {
          // console.log(state.next);
          return this.http$.get(state.next).pipe(
            map((resp) => nextPageSuccess({list: resp.results, next: resp.next})),
            catchError(() => nextPageFailure())
        )
        }),
        )
    );

    constructor(
      private store$: Store<AppState>,
        private actions$: Actions,
        private http$: HttpClient,
    ) {
    }

}
