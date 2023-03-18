import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { mapShipDtoToShipView, mapShipResponseDtoToShipResponseView } from "../../helpers/ship-mapping.helper";
import { ShipDto, ShipResponseDto, ShipResponseView } from "../../ships-data/ship.dto";
import { ShipsDataService } from "../../ships-data/ships-data.service";
import { LoadingState } from '../loading-state';
import * as ShipsViewActions from "./ships-view.actions";
import { ShipView } from "./ships-view.reducer";

@Injectable()
export class ShipsViewEffects {
    loadShips$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShipsViewActions.loadShips),
            tap(() => this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.LOADING }))),
            switchMap(() =>
                this.getShipsWithOptions$().pipe(
                    tap(() => this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.SUCCESS }))),
                    map(({ ships }: ShipResponseView) => ShipsViewActions.loadShipsSuccess({ shipsView: ships })),
                    catchError(() => of(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.LOADING_ERROR }))),
                ) 
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store,
        private shipsDataService: ShipsDataService,
    ) {}

    private getShips$(): Observable<ShipView[]> {
        return this.shipsDataService
            .fetchShips$()
            .pipe(
                map((ships: ShipDto[]) => ships.map((ship: ShipDto) => mapShipDtoToShipView(ship))),
            );
    }

    private getShipsWithOptions$(): Observable<ShipResponseView> {
        return this.shipsDataService
            .fetchShipsWithOptions$()
            .pipe(
                map((shipResponse: ShipResponseDto) => mapShipResponseDtoToShipResponseView(shipResponse))
            )
    }
}