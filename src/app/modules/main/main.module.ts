import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupInfoDialog, OverviewComponent} from './overview/overview.component';
import {MainRoutingModule} from './main-routing.module';
import {
    MatButtonModule,
    MatCardModule, MatDialog, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {GroupComponent} from './group/group.component';
import {GroupChatComponent} from './group-chat/group-chat.component';
import {SortByPipe} from 'src/app/sort.pipe';
import {FormsModule} from '@angular/forms';
import {DeviceDetectorModule} from 'ngx-device-detector';

@NgModule({
    declarations: [
        OverviewComponent,
        GroupComponent,
        GroupChatComponent,
        SortByPipe,
        GroupInfoDialog
    ],
    exports: [
        OverviewComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatTooltipModule,
        MatListModule,
        MatRippleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        DeviceDetectorModule.forRoot()
    ],
    providers:
    [
        MatDialog
    ],
    entryComponents:
    [
        GroupInfoDialog
    ]
})
export class MainModule
{
}
