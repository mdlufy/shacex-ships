import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CheckboxListComponent } from "./checkbox-list.component";

@NgModule({
    declarations: [CheckboxListComponent],
    imports: [CommonModule, FormsModule],
    exports: [CheckboxListComponent],
})
export class CheckboxListModule {}
