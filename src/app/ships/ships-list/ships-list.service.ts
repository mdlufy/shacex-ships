import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { LoadingState } from "../+state/loading-state";
import * as ShipsFiltersActions from "../+state/ships-filters/ships-filters.actions";
import {
    getShipsFilters,
    getShipsFiltersFields,
    getShipsPaginationOptions,
    getShipsPaginationPage,
    getShipsPaginationTotalPages
} from "../+state/ships-filters/ships-filters.selectors";
import * as ShipsViewActions from "../+state/ships-view/ships-view.actions";
import { ShipView } from "../+state/ships-view/ships-view.reducer";
import {
    getShipsView,
    getShipsViewLoadingState
} from "../+state/ships-view/ships-view.selectors";
import { ShipsFilters, ShipsFiltersFields, ShipsPagination } from './../+state/ships-filters/ships-filters.reducer';

@Injectable()
export class ShipsListService {
    public get shipsView$(): Observable<ShipView[]> {
        return this.store$.select(getShipsView);
    }

    public get loadingState$(): Observable<LoadingState> {
        return this.store$.select(getShipsViewLoadingState);
    }

    public get shipsFilters$(): Observable<ShipsFilters> {
        return this.store$.select(getShipsFilters);
    }

    public get paginationOptions$(): Observable<ShipsPagination> {
        return this.store$.select(getShipsPaginationOptions);
    }

    public get shipsTypes$(): Observable<string[]> {
        return this.store$.select(getShipsFiltersFields).pipe(
            map(({ shipTypes }: ShipsFiltersFields) => shipTypes),
        );
    }

    public get shipsPorts$(): Observable<string[]> {
        return this.store$.select(getShipsFiltersFields).pipe(
            map(({ shipPorts }: ShipsFiltersFields) => shipPorts),
        )
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
        this.store$.dispatch(ShipsFiltersActions.setShipsPaginationPage({ page: 1 }));
        this.store$.dispatch(ShipsViewActions.loadShips());
    }
}
