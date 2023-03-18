import { ShipView } from "../+state/ships-view/ships-view.reducer";
import {
    ShipDto,
    ShipResponseDto,
    ShipResponseView,
} from "../ships-data/ship.dto";

export function mapShipDtoToShipView(shipDto: ShipDto): ShipView {
    return {
        ...shipDto,
        homePort: shipDto.home_port,
        weight: shipDto.mass_kg,
        yearBuilt: shipDto.year_built,
    };
}

export function mapShipResponseDtoToShipResponseView(
    shipResponseDto: ShipResponseDto
): ShipResponseView {
    const ships = shipResponseDto.docs.map((doc: ShipDto) => mapShipDtoToShipView(doc));

    return {
        ...shipResponseDto,
        totalShips: shipResponseDto.totalDocs,
        ships,
    }
}
