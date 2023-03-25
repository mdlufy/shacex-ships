import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lib-checkbox-list",
    templateUrl: "./checkbox-list.component.html",
    styleUrls: ["./checkbox-list.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxListComponent),
            multi: true,
        },
    ],
})
export class CheckboxListComponent<T> implements ControlValueAccessor {
    @Input()
    items: ReadonlyArray<T> = [];

    @Input()
    placeholder: string | number = "";

    public get selectedItems(): Array<T> {
        return this._selectedItems;
    }

    public set selectedItems(value: Array<T>) {
        this._selectedItems = value;
        this.onChange(value);
    }

    public get selectedCount(): string {
        return this.selectedItems.length
            ? `Выбраны ${this.selectedItems.length}`
            : "";
    }

    public get selectedClasses(): string {
        return this.selectedItems.length ? "input-blue-border" : "";
    }

    private _selectedItems: Array<T>;

    constructor() {}

    public isCheckboxChecked(value: T): boolean {
        return this.selectedItems.includes(value);
    }

    public onCheckboxChange(value: T): void {
        if (!this.selectedItems.includes(value)) {
            this.selectedItems = [...this.selectedItems, value];

            return;
        }

        this.selectedItems = this.selectedItems.filter(item => item !== value);
    }

    onChange(_: any) {}

    writeValue(value: Array<T>): void {
        this.selectedItems = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void {}
}
