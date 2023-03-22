import { createReducer, on } from "@ngrx/store";
import * as ShipsFiltersActions from "./ships-filters.actions";

export const SHIPS_ON_PAGE = 5;
export const START_PAGE = 1;

export interface ShipsFiltersState {
    filters: ShipsFilters;
    filtersFields: ShipsFiltersFields;
    pagination: ShipsPagination;
}

export interface ShipsFilters {
    shipName: string | null;
    shipPortsItems: string[];
    shipType: string | null;
}

export interface ShipsFiltersFields {
    shipPorts: string[];
    shipTypes: string[];
}

export interface ShipsPagination {
    page: number;
    limit: number;
    totalPages: number;
}

export const shipsFiltersInitialState: ShipsFiltersState = {
    filters: {
        shipName: null,
        shipPortsItems: [],
        shipType: null,
    },
    filtersFields: {
        shipPorts: [],
        shipTypes: [],
    },
    pagination: {
        page: START_PAGE,
        limit: SHIPS_ON_PAGE,
        totalPages: 0,
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
    on(ShipsFiltersActions.setShipsFiltersFields, (state, { filtersFields }) => ({
        ...state,
        filtersFields,
    })),
);
