import { ShipView } from "../+state/ships-view/ships-view.reducer";
import {
    ShipDto,
    ShipsResponseDto,
    ShipsResponseView,
} from "../ships-data/ship.dto";

export function mapShipDtoToShipView(shipDto: ShipDto): ShipView {
    return {
        ...shipDto,
        homePort: shipDto.home_port,
        weight: shipDto.mass_kg,
        yearBuilt: shipDto.year_built,
    };
}

export function mapShipsResponseDtoToShipsResponseView(
    ShipsResponseDto: ShipsResponseDto
): ShipsResponseView {
    const ships = ShipsResponseDto.docs.map((doc: ShipDto) => mapShipDtoToShipView(doc));

    return {
        ...ShipsResponseDto,
        totalShips: ShipsResponseDto.totalDocs,
        ships,
    }
}
