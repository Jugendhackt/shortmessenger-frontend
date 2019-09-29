import {Component, OnDestroy, OnInit} from '@angular/core';
import {ValuesService} from '../../../core/services/values.service';
import {Api} from '../../../core/api/api.service';
import {Chat} from '../../../core/api/interfaces/Chat.interface';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {interval} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy
{
    darkMode: boolean;
    sidebarOpen: boolean;
    mobile: boolean;

    groups: Array<Chat> = [{
        id: 'loading',
        name: 'loading',
        messages: [{
            sender: 'networkException',
            content: 'Das Jugendhackt FFM 2019 Internet in a nutshell',
            time: (new Date().getDate() * 1000),
            error: false,
            errormsg: ''
        }],
        users: ['networkException', 'Niklas Schrötler', 'NWNG'],
        last: (new Date().getDate() * 1000),
        errormsg: '',
        error: false
    }];

    selectedChat: Chat;

    subscriptions: Array<any>;

    username: string;

    selectFirstGroup: boolean = true;

    constructor(private values: ValuesService, private api: Api, private dialog: MatDialog, private deviceService: DeviceDetectorService)
    {
        this.darkMode = false;
        this.sidebarOpen = true;
        this.mobile = false;

        this.subscriptions = new Array<any>();
    }

    showSidenav(): void
    {
        this.values.setSidebarOpen(true);

        console.log(this.sidebarOpen)
    }

    openDialog(): void
    {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialog.open(GroupInfoDialog, dialogConfig);
    }

    closedSidenav(): void
    {
        this.values.setSidebarOpen(false)
    }

    ngOnInit(): void
    {
        this.values.setMobile(this.deviceService.isMobile());

        this.username = this.values.getUsername();

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


        //Subscribe to api response
        this.subscriptions.push(this.api.read().subscribe((array) =>
        {
            this.groups = array;

            if(this.selectFirstGroup)
            {
                this.values.setSelectedChat(this.groups.sort((a, b) =>
                {
                    return b.last - a.last;
                })[0]);

                /*console.log(this.groups.sort((a, b) =>
                 {
                 return b.last - a.last;
                 }));

                 this.selectFirstGroup = false;
                 }
                 }));*/

                //Chat refresh lifecycle
                this.subscriptions.push(interval(1000).subscribe(() =>
                {
                    this.subscriptions.push(this.api.diff().subscribe((value =>
                    {
                        if(value.result)
                        {
                            this.subscriptions.push(this.api.read().subscribe(array =>
                            {
                                this.groups = array;

                                this.groups.forEach((group) =>
                                {
                                    if(group.name == this.selectedChat.name)
                                    {
                                        if(group != null)
                                        {
                                            this.values.setSelectedChat(group);
                                        }
                                    }
                                });
                            }));
                        }
                    })));
                }));
            }
        }));
    }

    logout(): void
    {
        this.values.setLoggedIn(false);

        localStorage.clear();
        localStorage.setItem('loggedIn', String(false));
    }

    send(message: string): void
    {
        console.log(message);
        this.api.send(this.selectedChat.id, message).subscribe(value =>
        {
            console.log(value);
            if(value.error)
            {
                this.values.subSnackbar().next(value.errormsg);
            }
        });
    }

    ngOnDestroy(): void
    {
        this.subscriptions.forEach((element) =>
        {
            element.unsubscribe();
        });
    }

    formattedNames(): string
    {
        let output = '';

        let once: boolean = true;
        let moreThen3: boolean = false;

        this.selectedChat.users.forEach((user, count) =>
        {
            if(count < 4)
            {
                output = output.concat(user + ', ');
            }
            else
            {
                moreThen3 = true;

                if(once)
                {
                    output = output.substring(0, output.length - 2);
                    output = output.concat(' and ' + (this.selectedChat.users.length - 4) + ' more');

                    once = false;
                }
            }
        });

        if(!moreThen3)
        {
            output = output.substring(0, output.length - 2);
        }

        if(output == '')
        {
            output = 'No users';
        }

        return output;
    }

    initTheme(): void
    {
        if(this.values.getSessionStart())
        {
            this.values.subSnackbar().next('Logged in as ' + this.username);
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

@Component({
    selector: 'groupInfoDialog',
    templateUrl: 'groupInfo.dialog.html',
    styleUrls: ['./groupInfo.dialog.scss'],
})
export class GroupInfoDialog implements OnInit, OnDestroy
{
    selectedChat: Chat;

    private subscriptions: Array<any> = new Array<any>();

    constructor(private dialogRef: MatDialogRef<GroupInfoDialog>, private values: ValuesService)
    {
    }

    ngOnInit(): void
    {
        this.selectedChat = this.values.getSelectedChat();

        this.subscriptions.push(this.values.subSelectedChat().subscribe(() =>
        {
            this.selectedChat = this.values.getSelectedChat();
        }));
    }

    ngOnDestroy(): void
    {
        this.subscriptions.forEach((element) =>
        {
            element.unsubscribe();
        });
    }

    onNoClick(): void
    {
        this.dialogRef.close();
    }
}
