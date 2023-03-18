import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ShipsModule } from "./ships/ships.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule, 
        AppRoutingModule, 
        HttpClientModule, 
        ShipsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
