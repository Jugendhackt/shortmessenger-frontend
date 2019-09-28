import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../../../core/api/interfaces/Chat.interface';
import {Message} from '../../../core/api/interfaces/Message.interface';

@Component({
    selector: 'app-group-chat',
    templateUrl: './group-chat.component.html',
    styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit
{
    @Input() chat: Chat;

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

    isMessageUser(message: Message): boolean
    {
        return false;
    }
}
