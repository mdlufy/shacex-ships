import { Observable } from "rxjs";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ShipView } from "../../+state/ships-view/ships-view.reducer";
import { LoadingState } from "../../+state/loading-state";
import { ShipStore } from "./ship.store";
import { ActivatedRoute, Router } from "@angular/router";

const shipInittialState: ShipView = {
    id: null,
    name: null,
    type: null,
    homePort: null,
    weight: null,
    yearBuilt: null,
    roles: null,
};

@Component({
    selector: "app-ships-detail",
    templateUrl: "./ships-detail.component.html",
    styleUrls: ["./ships-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShipStore],
})
export class ShipsDetailComponent implements OnInit {
    public ship$: Observable<ShipView>;

    public loadingState$: Observable<LoadingState>;

    public loadingState = LoadingState;

    public shipId: string | null;

    constructor(
        private readonly shipStore: ShipStore,
        private route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.shipId = this.route.snapshot.paramMap.get("id");

        this.ship$ = this.shipStore.ship$;
        this.loadingState$ = this.shipStore.loadingState$;
    }

    ngOnInit(): void {
        this.initShipState();
        this.initShipObservable();
    }

    public onClick(): void {
        this.router.navigate(["../"], { relativeTo: this.route });
    }

    private initShipState(): void {
        this.shipStore.setState({
            loadingState: LoadingState.LOADING,
            ship: shipInittialState,
        });
    }

    private initShipObservable(): void {
        if (this.shipId) {
            this.shipStore.getShipById$(this.shipId);
        }
    }
}
