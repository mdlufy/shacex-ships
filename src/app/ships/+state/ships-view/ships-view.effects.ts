import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import * as FiltersHelpers from '../../helpers/filters.helper';
import { mapShipDtoToShipView } from "../../helpers/ship-mapping.helper";
import { ShipsCacheService } from '../../ships-cache/ships-cache.service';
import { ShipDto } from "../../ships-data/ship.dto";
import { ShipsListOptions } from "../../ships-data/ships-data.service";
import { LoadingState } from '../loading-state';
import * as ShipsFiltersActions from "../ships-filters/ships-filters.actions";
import { ShipsFilters, ShipsFiltersFields, SHIPS_ON_PAGE } from "../ships-filters/ships-filters.reducer";
import { getShipsFilters, getShipsPaginationOptions } from "../ships-filters/ships-filters.selectors";
import * as ShipsViewActions from "./ships-view.actions";
import { ShipView } from "./ships-view.reducer";

@Injectable()
export class ShipsViewEffects {
    loadShips$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShipsViewActions.loadShips),
            tap(() => this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.LOADING }))),
            concatLatestFrom((action) => [this.store$.select(getShipsPaginationOptions), this.store$.select(getShipsFilters)]),
            switchMap(([action, paginationOptions, filters]) =>
                this.getShips$(paginationOptions, filters).pipe(
                    tap((shipsView: ShipView[]) => 
                        this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ 
                            loadingState: shipsView?.length ? LoadingState.SUCCESS : LoadingState.NOT_FOUND
                        }))
                    ),
                    map((shipsView: ShipView[]) => ShipsViewActions.loadShipsSuccess({ shipsView })),
                    catchError(() => of(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.LOADING_ERROR }))),
                ) 
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store,
        private shipsCacheService: ShipsCacheService,
    ) {}

    // TODO: переписать pipe более аккуратно
    private getShips$(options: ShipsListOptions, filters: ShipsFilters): Observable<ShipView[]> {
        return this.shipsCacheService.getShips$({} as ShipsListOptions)
            .pipe(
                map((shipsDto: ShipDto[]) => shipsDto.map(shipDto => mapShipDtoToShipView(shipDto))),
                tap((shipsView: ShipView[]) => this.setShipsFiltersFields(shipsView)),
                map((shipsView: ShipView[]) => FiltersHelpers.getFilteredShipsView(shipsView, filters)),
                tap((shipsView: ShipView[]) => this.setShipsPagination(shipsView)),
            )
    }

    private setShipsPagination(shipsView: ShipView[]): void {
        const totalPages = Math.ceil(shipsView.length / SHIPS_ON_PAGE);

        this.store$.dispatch(ShipsFiltersActions.setShipsPaginationTotalPages({ totalPages }));
    }

    private setShipsFiltersFields(shipsView: ShipView[]): void {
        const filtersFields: ShipsFiltersFields = FiltersHelpers.getShipsFiltersFields(shipsView);

        this.store$.dispatch(ShipsFiltersActions.setShipsFiltersFields({ filtersFields }));
    }
}