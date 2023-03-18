import { FEATURE_SHIPS_VIEW } from "./+state/ships-view/ships-view.selectors";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShipsPageComponent } from "./ships-page/ships-page.component";
import { ShipComponent } from "./components/ship/ship.component";
import { ShipsDetailComponent } from "./components/ships-detail/ships-detail.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { ShipsListComponent } from "./components/ships-list/ships-list.component";
import { ShipsDataService } from "./ships-data/ships-data.service";
import { ShipsViewEffects } from "./+state/ships-view/ships-view.effects";
import { shipsViewReducer } from "./+state/ships-view/ships-view.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ShipsLoadService } from "./+state/ships-view/ships-load/ships-load.service";
import { ShipsPageService } from "./ships-page/ships-page.service";
import { RolesListPipe } from "./components/ships-detail/roles-list.pipe";

const EFFECTS_LIST = [ShipsViewEffects];

@NgModule({
    declarations: [
        ShipsPageComponent,
        ShipComponent,
        ShipsDetailComponent,
        FiltersComponent,
        ShipsListComponent,
        RolesListPipe,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature(FEATURE_SHIPS_VIEW, shipsViewReducer),
        EffectsModule.forFeature(EFFECTS_LIST),
    ],
    providers: [ShipsDataService, ShipsLoadService, ShipsPageService],
})
export class ShipsModule {}
