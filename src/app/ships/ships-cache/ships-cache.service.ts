import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { ShipResponseDto } from "../ships-data/ship.dto";
import { ShipsDataService, ShipsListOptions } from "../ships-data/ships-data.service";

const CACHE_SIZE = 1;
const UNSUBSCRIBE_ZERO_CONSUMERS = true;

@Injectable()
export class ShipsCacheService {
    private shipsCache$ = new Map<string, Observable<ShipResponseDto>>();

    constructor(private shipsDataService: ShipsDataService) {}

    public getShips$(options: ShipsListOptions): Observable<ShipResponseDto> {
        const shipsRequestOptions = JSON.stringify(options);

        if (!this.shipsCache$.has(shipsRequestOptions)) {
            const response = this.shipsDataService.fetchShips$(options).pipe(
                shareReplay({ bufferSize: CACHE_SIZE, refCount: UNSUBSCRIBE_ZERO_CONSUMERS }),
            );

            this.shipsCache$.set(shipsRequestOptions, response);
        }

        return this.shipsCache$.get(shipsRequestOptions) as Observable<ShipResponseDto>;
    }
}