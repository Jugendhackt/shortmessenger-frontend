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

    unixTimeCodeFormatter(unix: number): string
    {
        let d: number = new Date().getTime();
        let diff: number = d - (unix * 1000);

        let dString;

        if(diff < 3600000)
        {
            dString = `${parseInt(String(diff / 60000)).toFixed(0)} minutes ago`;
        }
        else if(diff >= 3600000 && diff < 86400000)
        {
            dString = `${parseInt(String(diff / 3600000)).toFixed(0)} hours ago`;
        }
        else
        {
            dString = `${parseInt(String(diff / 86400000)).toFixed(0)} days ago`;
        }

        return dString;
    }
}
