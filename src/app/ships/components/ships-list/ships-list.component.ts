import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ShipView } from "../../+state/ships-view/ships-view.reducer";

@Component({
    selector: "app-ships-list",
    templateUrl: "./ships-list.component.html",
    styleUrls: ["./ships-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsListComponent implements OnInit {
    @Input() shipsView: ShipView[];

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {}

    public openShip(id: string): void {
        console.log(id);
        this.router.navigate(["./", id], { relativeTo: this.route });
    }
}
