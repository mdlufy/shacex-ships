import { ShipView } from "../+state/ships-view/ships-view.reducer";

export interface ShipDto {
    id: string;
    name: string;
    type: string;
    home_port: string;
    mass_kg: number;
    year_built: number;
    roles: string[];
}

export interface ShipResponseDto {
    docs: ShipDto[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
}

export interface ShipResponseView extends ShipResponseDto {
    ships: ShipView[];
    limit: number;
    page: number;
    totalPages: number;
    totalShips: number;
}
