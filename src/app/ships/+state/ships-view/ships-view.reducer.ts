import { LoadingState } from "../loading-state";
import { createReducer, on } from '@ngrx/store';
import * as ShipsViewActions from './ships-view.actions';

export interface ShipView {
    id: string | null;
    name: string | null;
    type: string | null;
    homePort: string | null;
    weight: number | null;
    yearBuilt: number | null;
    roles: string[] | null;
}

export interface ShipsViewState {
    loadingState: LoadingState;
    shipsView: ShipView[];
}

export const shipsViewInitialState: ShipsViewState = {
    loadingState: LoadingState.LOADING,
    shipsView: [],
};

export const shipsViewReducer = createReducer(
    shipsViewInitialState,
    on(ShipsViewActions.setShipsViewLoadingState, (state, { loadingState }) => ({
        ...state,
        loadingState,
    })),
    on(ShipsViewActions.loadShipsSuccess, (state, { shipsView }) => ({
        ...state,
        shipsView,
    })),
);

