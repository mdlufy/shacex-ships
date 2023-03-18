import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { ShipView } from "../../+state/ships-view/ships-view.reducer";

@Component({
    selector: "app-ship",
    templateUrl: "./ship.component.html",
    styleUrls: ["./ship.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipComponent implements OnInit {
    @Input() shipView: ShipView;

    @Output() openShip = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    public onClick(): void {
        if (this.shipView.id) {
            this.openShip.emit(this.shipView.id);
        }
    }
}
