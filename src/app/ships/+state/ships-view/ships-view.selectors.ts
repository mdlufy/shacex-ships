import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ShipsViewState } from "./ships-view.reducer";

export const FEATURE_SHIPS_VIEW = 'SHIPS_VIEW';

export const getShipsViewState = createFeatureSelector<ShipsViewState>(FEATURE_SHIPS_VIEW);

export const getShipsViewLoadingState = createSelector(
    getShipsViewState,
    (state: ShipsViewState) => state.loadingState
);

export const getShipsView = createSelector(
    getShipsViewState,
    (state: ShipsViewState) => state.shipsView
);

export const getShipsTypes = createSelector(
    getShipsViewState,
    (state: ShipsViewState) => state.shipsView.map(ship => ship.type)
    // (state: ShipsViewState) => {
    //     const shipsTypes = state.shipsView.map(ship => ship.type);

    //     return shipsTypes.filter(shipType => shipType !== null);
    // }
)