import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { initialApiUrl } from "src/app/config";
import { ShipDto, ShipResponseDto } from "./ship.dto";

@Injectable()
export class ShipsDataService {
    constructor(private readonly http$: HttpClient) {}

    public fetchShips$(): Observable<ShipDto[]> {
        return this.http$.get<ShipDto[]>(`${initialApiUrl}/v4/ships`);
    }

    public fetchShipsWithOptions$(): Observable<ShipResponseDto> {
        const query = {};

        const options = {
            page: 0,
            limit: 5,
        };

        return this.http$.post<ShipResponseDto>(`${initialApiUrl}/v4/ships/query`, { query, options });
    }

    public fetchShipByShipId$(shipId: string): Observable<ShipDto> {
        return this.http$.get<ShipDto>(`${initialApiUrl}/v4/ships/${shipId}`);
    }
}
