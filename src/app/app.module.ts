import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MainModule} from './modules/main/main.module';
import {MatButtonModule, MatSnackBar, MatSnackBarModule} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        BrowserAnimationsModule,
        RouterModule,
        MainModule,
        MatSnackBarModule,
        MatButtonModule
    ],
    providers: [
        MatSnackBar
    ],
    bootstrap: [AppComponent]
})
export class AppModule
{

}
