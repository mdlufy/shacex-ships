import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { initialApiUrl } from "src/app/config_api";
import { ShipDto } from "./ship.dto";

export interface ShipsListOptions {
    page: number | null;
    limit: number | null;
}

export interface ShipOptions extends Partial<ShipDto> {
    id: string;
}

@Injectable()
export class ShipsDataService {
    constructor(private readonly http$: HttpClient) {}

    // TODO: подумать можно ли сделать и пагинацию, и фильтрацию на беке. 
    // Проблема: имеется только часть списка, а для фильтров нужны поля из всех элементов

    // public fetchShipsWithOptions$(options: ShipsListOptions | {} = {}): Observable<ShipsResponseDto> {
    //     const query = {};

    //     return this.http$.post<ShipsResponseDto>(`${initialApiUrl}/v4/ships/query`, { query, options });
    // }

    public fetchShips$(): Observable<ShipDto[]> {
        return this.http$.get<ShipDto[]>(`${initialApiUrl}/v4/ships`);
    }

    public fetchShipByShipId$({ id }: ShipOptions): Observable<ShipDto> {
        return this.http$.get<ShipDto>(`${initialApiUrl}/v4/ships/${id}`);
    }

}
