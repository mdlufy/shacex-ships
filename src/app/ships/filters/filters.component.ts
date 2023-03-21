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

// TODO: оформить фильтры как библиотечные решения в mdlufy-ui

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

    @Output() filtersUpdate = new EventEmitter<ShipsFilters>();

    public get currentShipType(): string | null {
        return this._currentShipType;
    }

    public set currentShipType(value: string | null) {
        this._currentShipType = value;
    }

    public get currentShipPorts(): string[] {
        return this._currentShipPorts;
    }

    public set currentShipPorts(ports: string[]) {
        this._currentShipPorts = ports;
    }

    public readonly SHIP_NAME = FilterShipType.SHIP_NAME;
    public readonly SHIP_PORTS_ITEMS = FilterShipType.SHIP_PORTS_ITEMS;
    public readonly SHIP_TYPE = FilterShipType.SHIP_TYPE;

    public filtersForm: FormGroup = new FormGroup({
        [FilterShipType.SHIP_NAME]: new FormControl(),
        [FilterShipType.SHIP_PORTS_ITEMS]: new FormControl([], { nonNullable: true }),
        [FilterShipType.SHIP_TYPE]: new FormControl(), 
    });

    private _currentShipType: string | null;
    private _currentShipPorts: string[];

    constructor(@Inject(DestroyService) private readonly destroy$: Observable<void>) {}

    ngOnChanges({ filters }: SimpleChanges): void {
        if (filters && this.filtersForm) {
            this.setFiltersFormFields(filters.currentValue);
        }
    }

    ngOnInit(): void {
        this.initFiltersSubscription();
    }

    public isCheckboxChecked(value: string): boolean {
        return this.currentShipPorts.includes(value);
    }

    public isRadioChecked(value: string): boolean {
        return value === this.currentShipType;
    }

    public onCheckboxChange(shipPort: string): void {
        const shipPortsItems: string[] = this.filtersForm.get(this.SHIP_PORTS_ITEMS)?.value;

        if (!shipPortsItems.includes(shipPort)) {
            this.filtersForm.patchValue({ [FilterShipType.SHIP_PORTS_ITEMS]: [...shipPortsItems, shipPort] });

            return;
        }

        this.filtersForm.patchValue({ [FilterShipType.SHIP_PORTS_ITEMS]: shipPortsItems.filter(port => port !== shipPort) });
    }

    public onRadioChange(shipType: string): void {
        this.currentShipType = this.shipsTypes.find(type => type === shipType) as string;

        this.filtersForm.patchValue({ [FilterShipType.SHIP_TYPE]: this.currentShipType });
    }

    public resetFilters(): void {
        this.currentShipType = null;
        this.currentShipPorts = [];

        this.filtersForm.reset();
    }

    private setFiltersFormFields(filtersForm: ShipsFilters): void {
        this.filtersForm.setValue(filtersForm, { emitEvent: false });

        this.currentShipType = filtersForm.shipType
        this.currentShipPorts = filtersForm.shipPortsItems;
    }

    private initFiltersSubscription() {
        this.filtersForm.valueChanges.pipe(
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
            tap(() => this.filtersUpdate.emit(this.filtersForm.getRawValue())),
            takeUntil(this.destroy$),
        )
        .subscribe();
    }

}
