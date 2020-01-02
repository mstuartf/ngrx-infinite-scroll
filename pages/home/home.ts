import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../state/state";
import { Observable } from "rxjs";
import { nextPageRequest } from "../../state/actions";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public people$: Observable<number>;

  constructor(private store$: Store<AppState>) {
    this.people$ = this.store$.pipe(select<AppState, "people">("people"));
    this.nextPage();
  }

  public nextPage(): void {
    this.store$.dispatch(nextPageRequest());
  }
}
