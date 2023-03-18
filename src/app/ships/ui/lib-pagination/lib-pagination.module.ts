import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LibPaginationComponent } from "./lib-pagination.component";

@NgModule({
    imports: [CommonModule],
    declarations: [LibPaginationComponent],
    exports: [LibPaginationComponent],
})
export class LibPaginationModule {}
