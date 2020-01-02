import { createAction, props } from '@ngrx/store';

export const nextPageRequest = createAction('[Home Page] Next Page Request');

export const nextPageSuccess = createAction('[API] Next Page Success', props<{list: {name: string, birth_year: string}[]}>());

export const nextPageFailure = createAction('[API] Next Page Failure');
