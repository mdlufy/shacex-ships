import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LibInputComponent } from "./lib-input.component";


@NgModule({
    imports: [CommonModule],
    declarations: [LibInputComponent],
    exports: [LibInputComponent],
})
export class LibInputModule {}