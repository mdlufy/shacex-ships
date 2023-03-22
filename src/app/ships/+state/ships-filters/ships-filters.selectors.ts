import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ShipsFiltersState } from "./ships-filters.reducer";

export const FEATURE_SHIPS_FILTERS = 'SHIPS_FILTERS';

export const getShipsFiltersState = createFeatureSelector<ShipsFiltersState>(FEATURE_SHIPS_FILTERS);

export const getShipsFilters = createSelector(
    getShipsFiltersState,
    (state: ShipsFiltersState) => state.filters
);

export const getShipsFiltersFields = createSelector(
    getShipsFiltersState,
    (state: ShipsFiltersState) => state.filtersFields
);

export const getShipsPaginationOptions = createSelector(
    getShipsFiltersState,
    (state: ShipsFiltersState) => state.pagination
);
