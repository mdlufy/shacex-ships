import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { LoadingState } from "../+state/loading-state";
import { ShipView } from "../+state/ships-view/ships-view.reducer";
import { ShipOptions } from "../ships-data/ships-data.service";
import { ShipDetailStore } from "./+state/ship-detail.store";

@Component({
    selector: "app-ships-detail",
    templateUrl: "./ships-detail.component.html",
    styleUrls: ["./ships-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShipDetailStore],
})
export class ShipsDetailComponent implements OnInit {
    public ship$: Observable<ShipView>;
    public loadingState$: Observable<LoadingState>;

    public shipOptions$: BehaviorSubject<ShipOptions>;

    public loadingState = LoadingState;

    public shipId: string | null;

    constructor(
        private shipDetailStore: ShipDetailStore,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.ship$ = this.shipDetailStore.ship$;
        this.loadingState$ = this.shipDetailStore.loadingState$;

        this.shipId = this.route.snapshot.paramMap.get("id");
    }

    ngOnInit(): void {
        this.initShipLoadingOptions();
        this.loadShip();
    }

    public onClick(): void {
        this.router.navigate(["../"], { relativeTo: this.route });
    }

    private initShipLoadingOptions(): void {
        this.shipOptions$ = new BehaviorSubject<ShipOptions>({
            id: this.shipId ?? "",
        });
    }

    private loadShip(): void {
        this.shipDetailStore.loadShip$(this.shipOptions$.value);
    }
}
