import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { initialApiUrl } from "src/app/config_api";
import { ShipDto, ShipResponseDto } from "./ship.dto";

export interface ShipsListOptions {
    page: number;
    limit: number;
}

@Injectable()
export class ShipsDataService {
    constructor(private readonly http$: HttpClient) {}

    // public fetchShips$(): Observable<ShipDto[]> {
    //     return this.http$.get<ShipDto[]>(`${initialApiUrl}/v4/ships`);
    // }

    public fetchShips$(options: ShipsListOptions): Observable<ShipResponseDto> {
        const query = {};

        return this.http$.post<ShipResponseDto>(`${initialApiUrl}/v4/ships/query`, { query, options });
    }

    public fetchShipByShipId$(shipId: string): Observable<ShipDto> {
        return this.http$.get<ShipDto>(`${initialApiUrl}/v4/ships/${shipId}`);
    }
}
