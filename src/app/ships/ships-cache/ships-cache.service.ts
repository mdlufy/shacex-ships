import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { ShipDto, ShipsResponseDto } from "../ships-data/ship.dto";
import { ShipsDataService, ShipsListOptions } from "../ships-data/ships-data.service";

const CACHE_SIZE = 1;
const UNSUBSCRIBE_ZERO_CONSUMERS = true;

@Injectable()
export class ShipsCacheService {
    private shipsCache$ = new Map<string, Observable<ShipsResponseDto | ShipDto>>();

    constructor(private shipsDataService: ShipsDataService) {}

    public getShips$(options: ShipsListOptions): Observable<ShipsResponseDto> {
        const shipsRequestOptions = JSON.stringify(options);

        if (!this.shipsCache$.has(shipsRequestOptions)) {
            const response = this.shipsDataService.fetchShips$(options).pipe(
                shareReplay({ bufferSize: CACHE_SIZE, refCount: UNSUBSCRIBE_ZERO_CONSUMERS }),
            );

            this.shipsCache$.set(shipsRequestOptions, response);
        }

        return this.shipsCache$.get(shipsRequestOptions) as Observable<ShipsResponseDto>;
    }

    public getShipByShipId$(id: string): Observable<ShipDto> {
        const shipRequestId = id;

        console.log(this.shipsCache$.get(shipRequestId));

        if (!this.shipsCache$.has(shipRequestId)) {
            const response = this.shipsDataService.fetchShipByShipId$(shipRequestId).pipe(
                shareReplay({ bufferSize: CACHE_SIZE, refCount: UNSUBSCRIBE_ZERO_CONSUMERS }),
            );

            this.shipsCache$.set(shipRequestId, response);
        }

        return this.shipsCache$.get(shipRequestId) as Observable<ShipDto>;
    }
}