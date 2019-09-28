import {Component, OnInit} from '@angular/core';
import {ValuesService} from '../../../core/services/values.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit
{
    private darkMode: boolean;
    private sidebarOpen: boolean;
    private mobile: boolean;

    private subscriptions: Array<any>;

    constructor(private values: ValuesService)
    {
        this.darkMode = false;
        this.sidebarOpen = true;
        this.mobile = false;

        this.subscriptions = new Array<any>();
    }

    ngOnInit(): void
    {
        //Load appearance on init
        this.darkMode = this.values.getDarkMode();
        this.initTheme();

        //Load sidebar state on init
        this.sidebarOpen = this.values.getSidebarOpen();

        //Load mobile on init
        this.mobile = this.values.getMobile();

        //Subscribe to appearance changes
        this.subscriptions.push(this.values.subDarkMode().subscribe(() =>
        {
            this.darkMode = this.values.getDarkMode();
            this.loadTheme();
        }));

        //Subscribe to sidebar state changes
        this.subscriptions.push(this.values.subSidebarOpen().subscribe(() => this.sidebarOpen = this.values.getSidebarOpen()));

        //Subscribe to mobile changes
        this.subscriptions.push(this.values.subMobile().subscribe(() => this.mobile = this.values.getMobile()));

        //Subscribe to make elements noSelect
        this.subscriptions.push(this.values.subNoSelect().subscribe(() =>
        {
            for(let i = 0; i < document.getElementsByClassName("noSelect").length; i++)
            {
                document.getElementsByClassName('noSelect').item(i).addEventListener('contextmenu', event => event.preventDefault());
            }
        }));
    }

    ngOnDestroy(): void
    {
        this.subscriptions.forEach((element) =>
        {
            element.unsubscribe();
        });
    }

    initTheme(): void
    {
        if(this.values.getSessionStart())
        {
            this.values.subSnackbar().next('PureCore Dashboard launched');
            this.values.endSessionStart();
        }

        this.loadTheme();
    }

    loadTheme(): void
    {
        if(this.darkMode)
        {
            document.getElementsByClassName('cdk-overlay-container').item(0).classList.remove('lightMode');
            document.getElementsByClassName('cdk-overlay-container').item(0).classList.add('darkMode');

            document.getElementById('themeContainer').classList.remove('lightMode');
            document.getElementById('themeContainer').classList.add('darkMode');
        }
        else
        {
            document.getElementsByClassName('cdk-overlay-container').item(0).classList.remove('darkMode');
            document.getElementsByClassName('cdk-overlay-container').item(0).classList.add('lightMode');

            document.getElementById('themeContainer').classList.remove('darkMode');
            document.getElementById('themeContainer').classList.add('lightMode');

            console.log('Updated theme to lightMode');
        }
    }
}