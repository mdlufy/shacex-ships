import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tap } from "rxjs";
import { ShipsFilters } from "../+state/ships-filters/ships-filters.reducer";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit, OnChanges {
    @Input() filters: ShipsFilters;    

    @Output() filtersUpdate = new EventEmitter<ShipsFilters>();

    fitlersForm$ = new FormGroup({
        shipName: new FormControl(),
        portNames: new FormControl(),
        shipTypeName: new FormControl(),
    });

    constructor() {}

    ngOnChanges({ filters }: SimpleChanges): void {
        if (filters && filters.currentValue) {
            this.fitlersForm$.setValue({ ...filters.currentValue });
        }

        console.log(filters);
    }

    ngOnInit(): void {
        this.initFiltersSubscription();
        this.subscribeOnSearchForm();
    }

    private subscribeOnSearchForm(): void {

    }

    private initFiltersSubscription() {
        this.fitlersForm$.valueChanges.pipe(

            tap((value: any) => {
                console.log(value);

                console.log(this.fitlersForm$.getRawValue());

                this.filtersUpdate.emit(this.fitlersForm$.getRawValue());
            }),
        )
        .subscribe();
    }
}
