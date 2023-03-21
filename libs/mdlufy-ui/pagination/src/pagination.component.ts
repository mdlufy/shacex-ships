import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "lib-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {
    @Input()
    page: number = 0;

    @Input()
    total: number = 0;

    @Output()
    readonly changePage = new EventEmitter<number>();

    public get leftDisabled(): boolean {
        return this.page === 1;
    }

    public get rightDisabled(): boolean {
        return this.page === this.total;
    }

    constructor() {}

    public back() {
        this.changePage.emit(this.page - 1);
    }

    public next() {
        this.changePage.emit(this.page + 1);
    }
}
