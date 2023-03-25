import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DestroyService } from "mdlufy-ui";
import { distinctUntilChanged, Observable, takeUntil, tap } from "rxjs";
import { ShipsFilters } from "../+state/ships-filters/ships-filters.reducer";
import { FilterShipType } from "./filter-types";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FiltersComponent implements OnInit, OnChanges {
    @Input() filters: ShipsFilters;

    @Input() shipsPorts: string[];
    @Input() shipsTypes: string[];

    @Output() updateFilters = new EventEmitter<ShipsFilters>();

    public readonly SHIP_NAME = FilterShipType.SHIP_NAME;
    public readonly SHIP_PORTS_ITEMS = FilterShipType.SHIP_PORTS_ITEMS;
    public readonly SHIP_TYPE = FilterShipType.SHIP_TYPE;

    public filtersForm: FormGroup = new FormGroup({
        [FilterShipType.SHIP_NAME]: new FormControl(''),
        [FilterShipType.SHIP_PORTS_ITEMS]: new FormControl([], { nonNullable: true }),
        [FilterShipType.SHIP_TYPE]: new FormControl(''), 
    });

    constructor(@Inject(DestroyService) private readonly destroy$: Observable<void>) {}

    ngOnChanges({ filters }: SimpleChanges): void {
        if (filters && this.filtersForm) {
            this.setFiltersFormFields(filters.currentValue);
        }
    }

    ngOnInit(): void {
        this.initFiltersSubscription();
    }

    public resetFilters(): void {
        this.filtersForm.reset();
    }

    private setFiltersFormFields(filtersForm: ShipsFilters): void {
        this.filtersForm.setValue(filtersForm, { emitEvent: false });
    }

    private initFiltersSubscription() {
        this.filtersForm.valueChanges.pipe(
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
            tap(() => this.updateFilters.emit(this.filtersForm.getRawValue())),
            takeUntil(this.destroy$),
        )
        .subscribe();
    }
}
