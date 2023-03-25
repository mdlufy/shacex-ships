import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lib-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor {
    @Input() set value(value: string | number) {
        this._value = value;
        this.onChange(value);
    }

    @Input() placeholder: number | string = "";

    public get value() {
        return this._value;
    }

    private _value: string | number;

    constructor() {}

    onChange(_: any) {}

    writeValue(value: string | number) {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void {}
}
