import {BrowserModule} from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import { Api } from './core/api/api.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule
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
