import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
