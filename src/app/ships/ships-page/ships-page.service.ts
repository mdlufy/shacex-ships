import { getShipsViewLoadingState } from "./../+state/ships-view/ships-view.selectors";
import { LoadingState } from "../+state/loading-state";
import { getShipsView } from "./../+state/ships-view/ships-view.selectors";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ShipView } from "../+state/ships-view/ships-view.reducer";
import * as ShipsViewActions from '../+state/ships-view/ships-view.actions';

@Injectable()
export class ShipsPageService {
    public get shipsView$(): Observable<ShipView[]> {
        return this.store$.select(getShipsView);
    }

    public get loadingState$(): Observable<LoadingState> {
        return this.store$.select(getShipsViewLoadingState);
    }

    constructor(private store$: Store) {}

    public loadShips(): void {
        this.store$.dispatch(ShipsViewActions.loadShips());
    }
}
