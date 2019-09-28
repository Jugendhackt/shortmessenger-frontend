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
            var min = parseInt(String(diff / 60000)).toFixed(0);
            if(min == '0')
            {
                dString = `Just now`;
            }
            else
            {
                dString = `${min} minutes ago`;
            }
        }
        else if(diff >= 3600000 && diff < 86400000)
        {
            dString = `${parseInt(String(diff / 3600000)).toFixed(0)} hours ago`;
        }
        else
        {
            var days = parseInt(parseInt(String(diff / 86400000)).toFixed(0));
            if(days > 365)
            {
                dString = new Date(unix * 1000).toDateString();
            }
            else
            {
                dString = `${days} days ago`;
            }
        }

        return dString;
    }

    processMessage(msg:string):string {
        msg = msg.replace(new RegExp('@' + this.values.getUsername(), 'g'), '<i>@' + this.values.getUsername() +'</i>');
        msg = msg.replace(new RegExp('@everyone', 'g'), '<mention>@everyone</mention>');
        return this.urlify(msg);        
    }

    private urlify(text: string): string
    {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }
}
