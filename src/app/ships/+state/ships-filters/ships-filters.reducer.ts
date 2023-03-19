import { createReducer, on } from "@ngrx/store";
import * as ShipsFiltersActions from "./ships-filters.actions";

export interface ShipsFiltersState {
    filters: ShipsFilters;
    pagination: ShipsPagination;
}

export interface ShipsFilters {
    shipName: string | null;
    portNames: string[];
    shipTypeName: string | null;
}

export interface ShipsPagination {
    page: number;
    totalPages: number | null;
}

export const shipsFiltersInitialState: ShipsFiltersState = {
    filters: {
        shipName: null,
        portNames: [],
        shipTypeName: null,
    },
    pagination: {
        page: 1,
        totalPages: null,
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
