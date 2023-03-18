import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { mapShipDtoToShipView } from "src/app/ships/helpers/ship-mapping.helper";
import { ShipDto } from "src/app/ships/ships-data/ship.dto";
import { ShipsDataService } from "src/app/ships/ships-data/ships-data.service";
import { ShipView } from "../ships-view.reducer";

@Injectable()
export class ShipsLoadService {
    constructor(private readonly shipsDataService: ShipsDataService) {}

    public getShips$(): Observable<ShipView[]> {
        return this.shipsDataService
            .fetchShips$()
            .pipe(
                map((ships: ShipDto[]) => ships.map((ship: ShipDto) => mapShipDtoToShipView(ship))),
            );
    }
}
