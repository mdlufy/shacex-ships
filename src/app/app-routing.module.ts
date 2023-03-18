import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShipsDetailComponent } from "./ships/ships-detail/ships-detail.component";
import { ShipsListComponent } from "./ships/ships-list/ships-list.component";

const routes: Routes = [
    { path: "", redirectTo: "ships", pathMatch: "full" },
    {
        path: "ships",
        children: [
            {
                path: "",
                component: ShipsListComponent,
            },
            {
                path: ":id",
                component: ShipsDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
