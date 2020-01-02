import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { nextPageFailure, nextPageSuccess } from "./actions";
import { select, Store } from "@ngrx/store";
import { AppState } from "./state";

@Injectable()
export class PeopleEffects {
  nextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Home Page] Next Page Request"),
      withLatestFrom(this.store$.pipe(select<AppState, "people">("people"))),
      switchMap(([action, state]) => {
        return this.http$.get(state.next).pipe(
          map(resp => nextPageSuccess({ list: resp.results, next: resp.next })),
          catchError(() => nextPageFailure())
        );
      })
    )
  );

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private http$: HttpClient
  ) {}
}
