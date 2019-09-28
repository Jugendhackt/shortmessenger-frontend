import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit
{
    @Input() name: string;

    constructor()
    {
        this.name = 'loading';
    }

    ngOnInit(): void
    {
    }
}
