import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { InputModule, PaginationModule, RadioListModule, CheckboxListModule } from "mdlufy-ui";
import { shipsFiltersReducer } from "./+state/ships-filters/ships-filters.reducer";
import { FEATURE_SHIPS_FILTERS } from "./+state/ships-filters/ships-filters.selectors";
import { ShipsViewEffects } from "./+state/ships-view/ships-view.effects";
import { shipsViewReducer } from "./+state/ships-view/ships-view.reducer";
import { FEATURE_SHIPS_VIEW } from "./+state/ships-view/ships-view.selectors";
import { FiltersComponent } from "./filters/filters.component";
import { ShipComponent } from "./ship/ship.component";
import { ShipsCacheService } from "./ships-cache/ships-cache.service";
import { ShipsDataService } from "./ships-data/ships-data.service";
import { RolesListPipe } from "./ships-detail/roles-list-pipe/roles-list.pipe";
import { ShipsDetailComponent } from "./ships-detail/ships-detail.component";
import { ShipsListComponent } from "./ships-list/ships-list.component";
import { ShipsListService } from "./ships-list/ships-list.service";

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
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        InputModule,
        RadioListModule,
        CheckboxListModule,
        StoreModule.forFeature(FEATURE_SHIPS_VIEW, shipsViewReducer),
        StoreModule.forFeature(FEATURE_SHIPS_FILTERS, shipsFiltersReducer),
        EffectsModule.forFeature(EFFECTS_LIST),
    ],
    providers: [ShipsDataService, ShipsListService, ShipsCacheService],
})
export class ShipsModule {}
