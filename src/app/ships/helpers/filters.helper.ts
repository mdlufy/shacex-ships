import { ShipsFilters, ShipsFiltersFields } from "../+state/ships-filters/ships-filters.reducer";
import { ShipView } from "../+state/ships-view/ships-view.reducer";

export function getFilteredShipsView(shipsView: ShipView[], filters: ShipsFilters): ShipView[] {
    const ships = shipsView.filter(
        (ship) =>
            filterByNamePredicate(ship, filters.shipName) &&
            filterByPortsPredicate(ship, filters.shipPortsItems) &&
            filterByTypePredicate(ship, filters.shipType)
    );

    return ships;
}

export function filterByNamePredicate(ship: ShipView, filterName: string | null): boolean {
    if (!filterName) {
        return true;
    }
    if (!ship.name) {
        return false;
    }

    return ship.name.toLowerCase().includes(filterName.trim().toLowerCase());
};

export function filterByPortsPredicate(ship: ShipView, filterPorts: string[]): boolean {
    if (!filterPorts?.length) {
        return true;
    }

    if (!ship.homePort) {
        return false;
    }

    return filterPorts.includes(ship.homePort);
};

export function filterByTypePredicate(ship: ShipView, type: string | null): boolean {
    if (!type) {
        return true;
    }

    if (!ship.type) {
        return false;
    }

    return type === ship.type;
};

export function getShipsFiltersFields(shipsView: ShipView[]): ShipsFiltersFields {
    const shipPorts = getUniqueAndNotNullItems(shipsView.map(({ homePort }: ShipView) => homePort));
    const shipTypes = getUniqueAndNotNullItems(shipsView.map(({ type }: ShipView) => type));

    return {
        shipPorts,
        shipTypes,
    }
}

export function getUniqueAndNotNullItems(items: Array<string | null>): Array<string> {
    return items.filter((item, index, array) => item && array.indexOf(item) === index) as Array<string>;
}