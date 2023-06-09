import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "./input.component";


@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, FormsModule],
    exports: [InputComponent],
})
export class InputModule {}