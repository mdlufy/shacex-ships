import { ShipsFilters } from "../+state/ships-filters/ships-filters.reducer";
import { ShipView } from "../+state/ships-view/ships-view.reducer";

export function filterShipsView(
    shipsView: ShipView[],
    filters: ShipsFilters
): ShipView[] {
    const ships = shipsView.filter(
        (ship) =>
            filterByNamePredicate(ship, filters.shipName) &&
            filterByPortsPredicate(ship, filters.shipPortsItems) &&
            filterByTypePredicate(ship, filters.shipType)
    );

    return ships;
}

export const filterByNamePredicate = (
    ship: ShipView,
    filterName: string | null
): boolean => {
    if (!filterName) {
        return true;
    }
    if (!ship.name) {
        return false;
    }

    return ship.name.toLowerCase().includes(filterName.toLowerCase());
};

export const filterByPortsPredicate = (
    ship: ShipView,
    filterPorts: string[]
): boolean => {
    if (!filterPorts || !filterPorts.length) {
        return true;
    }

    if (!ship.homePort) {
        return false;
    }

    return true;
};

export const filterByTypePredicate = (
    ship: ShipView,
    type: string | null
): boolean => {
    if (!type) {
        return true;
    }

    if (!ship.type) {
        return false;
    }

    return type === ship.type;
};
