import { ShipView } from "../+state/ships-view/ships-view.reducer";
import { ShipDto } from "../ships-data/ship.dto";

export function mapShipDtoToShipView(shipDto: ShipDto): ShipView {
    return {
        ...shipDto,
        homePort: shipDto.home_port,
        weight: shipDto.mass_kg,
        yearBuilt: shipDto.year_built,
    };
}
