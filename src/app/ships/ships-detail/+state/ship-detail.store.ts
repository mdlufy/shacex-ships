import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { LoadingState } from "../../+state/loading-state";
import { ShipView } from "../../+state/ships-view/ships-view.reducer";
import { mapShipDtoToShipView } from "../../helpers/ship-mapping.helper";
import { ShipsCacheService } from "../../ships-cache/ships-cache.service";
import { ShipDto } from "../../ships-data/ship.dto";
import { ShipOptions } from "../../ships-data/ships-data.service";

export interface ShipState {
    loadingState: LoadingState;
    ship: ShipView;
}

const shipInittialState: ShipView = {
    id: null,
    name: null,
    type: null,
    homePort: null,
    weight: null,
    yearBuilt: null,
    roles: null,
};

@Injectable()
export class ShipDetailStore extends ComponentStore<ShipState> {
    public readonly ship$: Observable<ShipView> = this.select(
        (state) => state.ship
    );
    public readonly loadingState$: Observable<LoadingState> = this.select(
        (state) => state.loadingState
    );

    constructor(private shipsCacheService: ShipsCacheService) {
        super({ loadingState: LoadingState.LOADING, ship: shipInittialState });
    }

    private setShip = this.updater((state, ship: ShipView) => ({
        loadingState: LoadingState.SUCCESS,
        ship,
    }));

    public loadShip$ = this.effect((shipOptions$: Observable<ShipOptions>) => {
        return shipOptions$.pipe(
            tap(() => this.patchState({ loadingState: LoadingState.LOADING })),
            switchMap((shipOptions: ShipOptions) =>
                this.shipsCacheService.getShipByShipId$(shipOptions).pipe(
                    map((ship: ShipDto) => mapShipDtoToShipView(ship)),
                    tapResponse(
                        (ship: ShipView) => this.setShip(ship),
                        () => this.handleErrorResponse()
                    ),
                ),
            ),
        );
    });

    private handleErrorResponse(): Observable<ShipView | null> {
        this.patchState({ loadingState: LoadingState.LOADING_ERROR });

        return of(null);
    }
}
