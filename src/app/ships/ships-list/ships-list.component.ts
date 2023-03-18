import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoadingState } from "../+state/loading-state";
import { ShipView } from "../+state/ships-view/ships-view.reducer";
import { ShipsListService } from "./ships-list.service";

@Component({
    selector: "app-ships-list",
    templateUrl: "./ships-list.component.html",
    styleUrls: ["./ships-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsListComponent implements OnInit {
    public shipsView$: Observable<ShipView[]>;

    public page$: Observable<number>;
    public totalPages$: Observable<number | null>;

    public loadingState$: Observable<LoadingState>;

    public readonly loadingState = LoadingState;

    constructor(
        private shipsListService: ShipsListService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.shipsView$ = this.shipsListService.shipsView$;
        this.loadingState$ = this.shipsListService.loadingState$;
        this.page$ = this.shipsListService.page$;
        this.totalPages$ = this.shipsListService.totalPages$;
    }

    ngOnInit(): void {
        this.initShips();
    }

    public openShip(id: string): void {
        this.router.navigate(["./", id], { relativeTo: this.route });
    }

    public changePage(page: number): void {
        this.shipsListService.changePage(page);
    }

    private initShips(): void {
        this.shipsListService.loadShips();
    }
}
