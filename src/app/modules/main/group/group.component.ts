import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../core/api/interfaces/Group.interface';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit
{
    @Input() group: Group;

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

    formatUsers(): string
    {
        let output: string = '';

        this.group.users.forEach((user) =>
        {
            output = output.concat(user + ", ");
        });

        return output.substring(0, output.length - 2);
    }
}
