export interface ShipDto {
    id: string;
    name: string;
    type: string;
    home_port: string;
    mass_kg: number;
    year_built: number;
    roles: string[];
}
