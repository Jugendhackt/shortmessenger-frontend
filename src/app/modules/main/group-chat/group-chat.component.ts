import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../../../core/api/interfaces/Chat.interface';
import {Message} from '../../../core/api/interfaces/Message.interface';
import {ValuesService} from '../../../core/services/values.service';

@Component({
    selector: 'app-group-chat',
    templateUrl: './group-chat.component.html',
    styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit
{
    @Input() chat: Chat;

    constructor(private values: ValuesService)
    {
    }

    ngOnInit(): void
    {
    }

    isMessageUser(message: Message): boolean
    {
        return message.sender == this.values.getUsername();
    }
}
