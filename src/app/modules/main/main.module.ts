import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview/overview.component';
import {MainRoutingModule} from './main-routing.module';
import {MatCardModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
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
        MatToolbarModule
    ]
})
export class MainModule
{
}
