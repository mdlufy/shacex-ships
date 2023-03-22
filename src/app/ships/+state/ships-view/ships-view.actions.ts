import { createAction, props } from "@ngrx/store";
import { LoadingState } from "../loading-state";
import { ShipView } from "./ships-view.reducer";

export const getShipsViewLoadingState = createAction(
    '[Ships View] Get Ships View Loading State'
);

export const setShipsViewLoadingState = createAction(
    '[Ships View] Set Ships View Loading State',
    props<{ loadingState: LoadingState }>(),
);

export const loadShips = createAction(
    '[Ships View] Load Ships',
);

export const loadShipsSuccess = createAction(
    '[Ships View] Load Ships Success',
    props<{ shipsView: ShipView[] }>(),
);

export const loadShipByShipId = createAction(
    '[Ships View] Load Ship By Ship Id',
    props<{ shipId: string }>(),
);

export const loadShipByShipIdSuccess = createAction(
    '[Ships View] Load Ship By Ship Id Success',
    props<{ ship: ShipView }>(),
);
