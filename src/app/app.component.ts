import {Component, OnInit} from '@angular/core';
import {Api} from './core/api/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    constructor(private api: Api) {}

    ngOnInit()
    {
        this.api.testConnection();
    }
}
