import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview/overview.component';
import {MainRoutingModule} from './main-routing.module';
import {
    MatButtonModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {GroupComponent} from './group/group.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { MessageComponent } from './message/message.component';

@NgModule({
    declarations: [
        OverviewComponent,
        GroupComponent,
        GroupChatComponent,
        MessageComponent
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
        MatInputModule
    ]
})
export class MainModule
{
}
