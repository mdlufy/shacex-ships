import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";

@Component({
    selector: "lib-pagination",
    templateUrl: "./lib-pagination.component.html",
    styleUrls: ["./lib-pagination.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibPaginationComponent implements OnInit {
    @Input() page: number;
    @Input() total: number;

    @Output() changePage = new EventEmitter<number>();

    constructor() {}

    public ngOnInit() {}

    public onPrevious() {
        this.changePage.emit(this.page - 1);
    }

    public onNext() {
        this.changePage.emit(this.page + 1);
    }
}
