import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { shipsFiltersReducer } from "./+state/ships-filters/ships-filters.reducer";
import { FEATURE_SHIPS_FILTERS } from "./+state/ships-filters/ships-filters.selectors";
import { ShipsViewEffects } from "./+state/ships-view/ships-view.effects";
import { shipsViewReducer } from "./+state/ships-view/ships-view.reducer";
import { FEATURE_SHIPS_VIEW } from "./+state/ships-view/ships-view.selectors";
import { ShipsListService } from "./ships-list/ships-list.service";
import { ShipsDataService } from "./ships-data/ships-data.service";
import { LibPaginationModule } from "./ui/lib-pagination/lib-pagination.module";
import { ShipComponent } from "./ship/ship.component";
import { ShipsDetailComponent } from "./ships-detail/ships-detail.component";
import { RolesListPipe } from "./ships-detail/roles-list.pipe";
import { FiltersComponent } from "./filters/filters.component";
import { ShipsListComponent } from "./ships-list/ships-list.component";
import { ShipsCacheService } from "./ships-cache/ships-cache.service";

const EFFECTS_LIST = [ShipsViewEffects];

@NgModule({
    declarations: [
        ShipComponent,
        ShipsDetailComponent,
        ShipsListComponent,
        FiltersComponent,
        RolesListPipe,
    ],
    imports: [
        CommonModule,
        LibPaginationModule,
        StoreModule.forFeature(FEATURE_SHIPS_VIEW, shipsViewReducer),
        StoreModule.forFeature(FEATURE_SHIPS_FILTERS, shipsFiltersReducer),
        EffectsModule.forFeature(EFFECTS_LIST),
    ],
    providers: [ShipsDataService, ShipsListService, ShipsCacheService],
})
export class ShipsModule {}
