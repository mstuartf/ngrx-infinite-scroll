import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { AppState } from './state';

export const initialState: AppState = {
  list: [],
  loading: false,
  next : 'https://swapi.co/api/people/?page=1'
};
 
const _peopleReducer = createReducer(initialState,
  on(actions.nextPageRequest, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(actions.nextPageSuccess, (state, payload) => {
    return {
      loading: false,
      list: [...state.list, ...payload.list],
      next: payload.next
    }
  }),
);
 
export function peopleReducer(state, action) {
  return _peopleReducer(state, action);
}
