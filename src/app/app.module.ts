import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ShipsModule } from "./ships/ships.module";

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
