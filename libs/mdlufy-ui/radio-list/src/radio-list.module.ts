import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RadioListComponent } from "./radio-list.component";

@NgModule({
    declarations: [RadioListComponent],
    imports: [CommonModule, FormsModule],
    exports: [RadioListComponent],
})
export class RadioListModule {}
