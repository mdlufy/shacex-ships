import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoadingState } from "../+state/loading-state";
import { ShipsFilters, ShipsPagination } from "../+state/ships-filters/ships-filters.reducer";
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

    public shipsFilters$: Observable<ShipsFilters>;

    public paginationOptions$: Observable<ShipsPagination>;

    public loadingState$: Observable<LoadingState>;

    public shipsTypes$: Observable<string[]>;
    public shipsPorts$: Observable<string[]>;

    public readonly loadingState = LoadingState;

    constructor(
        private shipsListService: ShipsListService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.shipsView$ = this.shipsListService.shipsView$;
        this.loadingState$ = this.shipsListService.loadingState$;
        this.shipsFilters$ = this.shipsListService.shipsFilters$;
        this.shipsTypes$ = this.shipsListService.shipsTypes$;
        this.shipsPorts$ = this.shipsListService.shipsPorts$;
        this.paginationOptions$ = this.shipsListService.paginationOptions$;
    }

    ngOnInit(): void {
        this.loadShips();
    }

    public changePage(page: number): void {
        this.shipsListService.changePage(page);
    }

    public openShip(id: string): void {
        this.router.navigate(["./", id], { relativeTo: this.route });
    }

    public onupdateFilters(filters: ShipsFilters): void {
        this.shipsListService.updateFilters(filters);
    }

    private loadShips(): void {
        this.shipsListService.loadShips$();
    }
}
