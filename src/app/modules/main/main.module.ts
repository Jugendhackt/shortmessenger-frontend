import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview/overview.component';
import {MainRoutingModule} from './main-routing.module';
import {MatCardModule, MatSidenavModule} from '@angular/material';

@NgModule({
    declarations: [
        OverviewComponent
    ],
    exports: [
        OverviewComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MatSidenavModule,
        MatCardModule
    ]
})
export class MainModule
{
}
