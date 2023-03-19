import { ShipsFilters } from './../+state/ships-filters/ships-filters.reducer';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoadingState } from "../+state/loading-state";
import * as ShipsFiltersActions from "../+state/ships-filters/ships-filters.actions";
import * as ShipsViewActions from "../+state/ships-view/ships-view.actions";
import { ShipView } from "../+state/ships-view/ships-view.reducer";
import {
    getShipsView,
    getShipsViewLoadingState,
} from "../+state/ships-view/ships-view.selectors";
import {
    getShipsFilters,
    getShipsPaginationPage,
    getShipsPaginationTotalPages,
} from "../+state/ships-filters/ships-filters.selectors";

@Injectable()
export class ShipsListService {
    public get shipsView$(): Observable<ShipView[]> {
        return this.store$.select(getShipsView);
    }

    public get loadingState$(): Observable<LoadingState> {
        return this.store$.select(getShipsViewLoadingState);
    }

    public get page$(): Observable<number> {
        return this.store$.select(getShipsPaginationPage);
    }

    public get totalPages$(): Observable<number | null> {
        return this.store$.select(getShipsPaginationTotalPages);
    }

    public get shipsFilters$(): Observable<ShipsFilters> {
        return this.store$.select(getShipsFilters);
    }

    constructor(private store$: Store) {}

    public loadShips$(): void {
        this.store$.dispatch(ShipsViewActions.loadShips());
    }

    public changePage(page: number): void {
        this.store$.dispatch(ShipsFiltersActions.setShipsPaginationPage({ page }));
        this.store$.dispatch(ShipsViewActions.loadShips());
    }

    public filtersUpdate(filters: ShipsFilters): void {
        this.store$.dispatch(ShipsFiltersActions.setShipsFiltersState({ filters }));
        this.store$.dispatch(ShipsViewActions.loadShips());
    }
}
