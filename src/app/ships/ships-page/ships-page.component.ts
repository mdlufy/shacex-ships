import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ShipView } from "../+state/ships-view/ships-view.reducer";
import { LoadingState } from "../+state/loading-state";
import { ShipsPageService } from "./ships-page.service";

@Component({
    selector: "app-ships-page",
    templateUrl: "./ships-page.component.html",
    styleUrls: ["./ships-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsPageComponent implements OnInit {
    public shipsView$: Observable<ShipView[]>;
    
    public loadingState$: Observable<LoadingState>;

    public readonly loadingState = LoadingState;

    constructor(private shipsPageService: ShipsPageService) {
        this.shipsView$ = this.shipsPageService.shipsView$;
        this.loadingState$ = this.shipsPageService.loadingState$
    }

    ngOnInit(): void {
        this.initShips();
    }

    private initShips(): void {
        this.shipsPageService.loadShips();
    }
}
