import { ShipsCacheService } from './../ships-cache/ships-cache.service';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { LoadingState } from "../+state/loading-state";
import { ShipView } from "../+state/ships-view/ships-view.reducer";
import { mapShipDtoToShipView } from "../helpers/ship-mapping.helper";
import { ShipDto } from "../ships-data/ship.dto";
import { ShipsDataService } from "../ships-data/ships-data.service";

export interface ShipState {
    loadingState: LoadingState;
    ship: ShipView;
}

@Injectable()
export class ShipStore extends ComponentStore<ShipState> {
    public readonly ship$: Observable<ShipView> = this.select(
        (state) => state.ship
    );
    public readonly loadingState$: Observable<LoadingState> = this.select(
        (state) => state.loadingState
    );

    constructor(private shipsCacheService: ShipsCacheService) {
        super();
    }

    public getShipById$ = this.effect((shipId$: Observable<string>) => {
        return shipId$.pipe(
            switchMap((shipId: string) =>
                this.shipsCacheService.getShipByShipId$(shipId).pipe(
                    map((ship: ShipDto) => mapShipDtoToShipView(ship)),
                    tap((ship: ShipView) => {
                        this.setState({
                            loadingState: LoadingState.SUCCESS,
                            ship,
                        });
                    }),
                    catchError(() => of(null))
                )
            )
        );
    });
}
