import {BrowserModule} from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import { Api } from './core/api/api.service';
import {OverviewComponent} from './modules/main/overview/overview.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        OverviewComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule implements OnInit
{
    constructor(private api: Api) {}

    ngOnInit(){
        this.api.testConnection();
    }

}
