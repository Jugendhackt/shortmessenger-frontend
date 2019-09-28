import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../../../core/api/interfaces/Chat.interface';
import {ValuesService} from '../../../core/services/values.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit
{
    @Input() chat: Chat;

    constructor(private values: ValuesService)
    {
    }

    ngOnInit(): void
    {
    }

    formatUsers(): string
    {
        let output: string = '';

        this.chat.users.forEach((user) =>
        {
            output = output.concat(user + ", ");
        });

        return output.substring(0, output.length - 2);
    }

    selectChat(): void
    {
        this.values.setSelectedChat(this.chat);
    }
}
