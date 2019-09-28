import {Component, OnDestroy, OnInit} from '@angular/core';
import {ValuesService} from '../../../core/services/values.service';
import {Api} from '../../../core/api/api.service';
import {Chat} from '../../../core/api/interfaces/Chat.interface';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy
{
    private darkMode: boolean;
    private sidebarOpen: boolean;
    private mobile: boolean;

    private groups: Array<Chat>;
    private selectedChat;

    private subscriptions: Array<any>;

    constructor(private values: ValuesService, private api: Api)
    {
        this.darkMode = false;
        this.sidebarOpen = true;
        this.mobile = false;

        console.log(this.groups);

        this.selectedChat = null;

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

        //Load selectedChat on init
        this.selectedChat = this.values.getSelectedChat();

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

        //Subscribe to selected chat changes
        this.subscriptions.push(this.values.subSelectedChat().subscribe(() =>
        {
            this.selectedChat = this.values.getSelectedChat();
        }));

        this.subscriptions.push(this.api.send('3e1yro73', 'test').subscribe((array) => console.log(array)));
        this.subscriptions.push(this.api.read().subscribe((array) =>
        {
            this.groups = array;
            console.log(array);
            this.values.setSelectedChat(this.groups[1])
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
            this.values.subSnackbar().next('ShortMessenger launched');
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

            console.log('Updated theme to darkMode');
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
