import { createAction, props } from "@ngrx/store";
import { ShipsFilters, ShipsPagination } from "./ships-filters.reducer";

export const getShipsFiltersState = createAction(
    "[Filters View] Get Ships Filters State"
);

export const setShipsFiltersState = createAction(
    "[Filters View] Set Ships Filters State",
    props<{ filters: ShipsFilters }>()
);

export const getShipsPaginationState = createAction(
    "[Filters View] Get Ships Pagination State"
);

export const setShipsPaginationState = createAction(
    "[Filters View] Set Ships Pagination State",
    props<{ pagination: ShipsPagination }>()
);

export const setShipsPaginationPage = createAction(
    "[Filters View] Set Ships Pagination Page",
    props<{ page: number }>()
);

export const getShipsPaginationPage = createAction(
    "[Filters View] Get Ships Pagination Page"
);

export const getShipsPaginationTotalPages = createAction(
    "[Filter View] Get Ships Pagination Total Pages"
);

export const setShipsPaginationTotalPages = createAction(
    "[Filters View] Set Ships Pagination Total Pages",
    props<{ totalPages: number }>()
);
