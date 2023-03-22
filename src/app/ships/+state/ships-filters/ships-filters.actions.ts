import { createAction, props } from "@ngrx/store";
import { ShipsFilters, ShipsFiltersFields, ShipsPagination } from "./ships-filters.reducer";

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

export const setShipsPaginationTotalPages = createAction(
    "[Filters View] Set Ships Pagination Total Pages",
    props<{ totalPages: number }>()
);

export const setShipsFiltersFields = createAction(
    "[Filters View] Set Ships Filters Items",
    props<{ filtersFields: ShipsFiltersFields }>(),
);
