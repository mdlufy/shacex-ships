import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lib-radio-list",
    templateUrl: "./radio-list.component.html",
    styleUrls: ["./radio-list.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioListComponent),
            multi: true,
        },
    ],
})
export class RadioListComponent<T> implements ControlValueAccessor {
    @Input()
    items: ReadonlyArray<T> = [];

    public get selectedItem() {
        return this._selectedItem;
    }

    public set selectedItem(value: T) {
        this._selectedItem = value;
        this.onChange(value);
    }

    private _selectedItem: T;

    constructor() {}

    public isRadioChecked(value: T): boolean {
        return value === this.selectedItem;
    }

    public onRadioChange(value: T): void {
        this.selectedItem = value;
    }

    onChange(_: any) {}

    writeValue(value: T): void {
        this.selectedItem = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void {}
}
