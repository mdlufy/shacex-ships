import { createReducer, on } from "@ngrx/store";
import * as ShipsFiltersActions from "./ships-filters.actions";

export const SHIPS_ON_PAGE = 5;
export const START_PAGE = 0;

export interface ShipsFiltersState {
    filters: ShipsFilters;
    pagination: ShipsPagination;
}

export interface ShipsFilters {
    shipName: string | null;
    shipPortsItems: string[];
    shipType: string | null;
}

export interface ShipsPagination {
    page: number;
    limit: number | null;
    totalPages: number | null;
    totalShips: number | null;
}

export const shipsFiltersInitialState: ShipsFiltersState = {
    filters: {
        shipName: null,
        shipPortsItems: [],
        shipType: null,
    },
    pagination: {
        page: START_PAGE,
        limit: SHIPS_ON_PAGE,
        totalPages: null,
        totalShips: null,
    },
};

export const shipsFiltersReducer = createReducer(
    shipsFiltersInitialState,
    on(ShipsFiltersActions.setShipsPaginationState, (state, { pagination }) => ({
        ...state,
        pagination,
    })),
    on(ShipsFiltersActions.setShipsFiltersState, (state, { filters }) => ({
        ...state,
        filters,
    })),
    on(ShipsFiltersActions.setShipsPaginationPage, (state, { page }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            page,
        }
    })),
    on(ShipsFiltersActions.setShipsPaginationTotalPages, (state, { totalPages }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            totalPages,
        }
    })),
);
