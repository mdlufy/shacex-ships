import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoadingState } from '../loading-state';
import { ShipsLoadService } from "./ships-load/ships-load.service";
import * as ShipsViewActions from "./ships-view.actions";
import { ShipView } from "./ships-view.reducer";

@Injectable()
export class ShipsViewEffects {
    loadShips$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShipsViewActions.loadShips),
            tap(() => this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.LOADING }))),
            switchMap(() =>
                this.shipsLoadService.getShips$().pipe(
                    tap(() => this.store$.dispatch(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.SUCCESS }))),
                    map((shipsView: ShipView[]) => ShipsViewActions.loadShipsSuccess({ shipsView })),
                    catchError(() => of(ShipsViewActions.setShipsViewLoadingState({ loadingState: LoadingState.LOADING_ERROR }))),
                ) 
            )
        )
    );

    loadShipByShipId$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShipsViewActions.loadShipByShipId),
        tap(() => this.store$)
    )
    )

    constructor(
        private actions$: Actions,
        private store$: Store,
        private shipsLoadService: ShipsLoadService,
    ) {}
}