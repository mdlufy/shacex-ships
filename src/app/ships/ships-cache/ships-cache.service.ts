import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { ShipDto } from "../ships-data/ship.dto";
import { ShipsDataService, ShipsListOptions } from "../ships-data/ships-data.service";
import { ShipOptions } from './../ships-data/ships-data.service';

const CACHE_SIZE = 1;
const UNSUBSCRIBE_ZERO_CONSUMERS = true;

@Injectable()
export class ShipsCacheService {
    private shipsCache$ = new Map<string, Observable<ShipDto | ShipDto[]>>();

    constructor(private shipsDataService: ShipsDataService) {}

    public getShips$(options: ShipsListOptions): Observable<ShipDto[]> {
        const shipsRequestOptions = JSON.stringify(options);

        if (!this.shipsCache$.has(shipsRequestOptions)) {
            const response = this.shipsDataService.fetchShips$().pipe(
                shareReplay({ bufferSize: CACHE_SIZE, refCount: UNSUBSCRIBE_ZERO_CONSUMERS }),
            );

            this.shipsCache$.set(shipsRequestOptions, response);
        }

        return this.shipsCache$.get(shipsRequestOptions) as Observable<ShipDto[]>;
    }

    public getShipByShipId$(options: ShipOptions): Observable<ShipDto> {
        const shipRequestId = options.id;

        if (!this.shipsCache$.has(shipRequestId)) {
            const response = this.shipsDataService.fetchShipByShipId$(options).pipe(
                shareReplay({ bufferSize: CACHE_SIZE, refCount: UNSUBSCRIBE_ZERO_CONSUMERS }),
            );

            this.shipsCache$.set(shipRequestId, response);
        }

        return this.shipsCache$.get(shipRequestId) as Observable<ShipDto>;
    }
}