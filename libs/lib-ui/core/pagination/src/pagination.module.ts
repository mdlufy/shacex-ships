import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination.component";
import { PaginatorPipe } from "./paginator-pipe/paginator.pipe";

@NgModule({
    declarations: [PaginationComponent, PaginatorPipe],
    imports: [CommonModule],
    exports: [PaginationComponent, PaginatorPipe],
})
export class PaginationModule {}
