import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { mapShipsResponseDtoToShipsResponseView } from "../../helpers/ship-mapping.helper";
import { ShipsCacheService } from '../../ships-cache/ships-cache.service';
import { ShipsResponseDto, ShipsResponseView } from "../../ships-data/ship.dto";
import { ShipsListOptions } from "../../ships-data/ships-data.service";
import { LoadingState } from '../loading-state';
import * as ShipsFiltersActions from "../ships-filters/ships-filters.actions";
import { getShipsPaginationPage } from './../ships-filters/ships-filters.selectors';
import * as ShipsViewActions from "./ships-view.actions";

const SHIPS_ON_PAGE = 5;

@Injectable()
export class ShipsViewEffects {
    loadShips$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShipsViewActions.loadShips),
            tap(() => this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.LOADING }))),
            concatLatestFrom((action) => this.store$.select(getShipsPaginationPage)),
            switchMap(([action, page]) =>
                this.getShips$(page).pipe(
                    tap(() => this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.SUCCESS }))),
                    map(({ ships }: ShipsResponseView) => ShipsViewActions.loadShipsSuccess({ shipsView: ships })),
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

    private getShips$(page: number): Observable<ShipsResponseView> {
        const options: ShipsListOptions = {
            page,
            limit: SHIPS_ON_PAGE,
        };

        return this.shipsCacheService.getShips$(options)
            .pipe(
                map((shipResponse: ShipsResponseDto) => mapShipsResponseDtoToShipsResponseView(shipResponse)),
                tap(({ page, totalPages }: ShipsResponseView) => {
                    this.store$.dispatch(ShipsFiltersActions.setShipsPaginationState({ pagination: { page, totalPages } }))
                })
            )
    }
}