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

// TODO: оформить фильтр чекбоксов как библиотечное решение в mdlufy-ui: 
// вынести в отдельный компонент, реализующий ControlValueAccessor

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

    public get currentShipPorts(): string[] {
        return this._currentShipPorts;
    }

    public set currentShipPorts(ports: string[]) {
        this._currentShipPorts = ports;
    }

    public get shipsPortsValue(): string {
        return this.currentShipPorts.length ? `Выбраны ${this.currentShipPorts.length}` : '';
    }

    public get shipsPortsClasses(): string {
        return this.currentShipPorts.length ? 'input-blue-border' : '';
    }

    public readonly SHIP_NAME = FilterShipType.SHIP_NAME;
    public readonly SHIP_PORTS_ITEMS = FilterShipType.SHIP_PORTS_ITEMS;
    public readonly SHIP_TYPE = FilterShipType.SHIP_TYPE;

    public filtersForm: FormGroup = new FormGroup({
        [FilterShipType.SHIP_NAME]: new FormControl(''),
        [FilterShipType.SHIP_PORTS_ITEMS]: new FormControl([], { nonNullable: true }),
        [FilterShipType.SHIP_TYPE]: new FormControl(''), 
    });

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

    public onCheckboxChange(shipPort: string): void {
        const shipPortsItems: string[] = this.filtersForm.get(this.SHIP_PORTS_ITEMS)?.value;

        if (!shipPortsItems.includes(shipPort)) {
            this.filtersForm.patchValue({ [FilterShipType.SHIP_PORTS_ITEMS]: [...shipPortsItems, shipPort] });

            return;
        }

        this.filtersForm.patchValue({ [FilterShipType.SHIP_PORTS_ITEMS]: shipPortsItems.filter(port => port !== shipPort) });
    }

    public resetFilters(): void {
        this.currentShipPorts = [];

        this.filtersForm.reset();
    }

    private setFiltersFormFields(filtersForm: ShipsFilters): void {
        this.filtersForm.setValue(filtersForm, { emitEvent: false });

        this.currentShipPorts = filtersForm.shipPortsItems;
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
