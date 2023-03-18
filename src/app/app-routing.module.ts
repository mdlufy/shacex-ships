import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShipsDetailComponent } from "./ships/components/ships-detail/ships-detail.component";
import { ShipsPageComponent } from "./ships/ships-page/ships-page.component";

const routes: Routes = [
    { path: "", redirectTo: "ships", pathMatch: "full" },
    {
        path: "ships",
        children: [
            {
                path: "",
                component: ShipsPageComponent,
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
