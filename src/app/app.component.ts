import {Component, OnDestroy, OnInit} from '@angular/core';
import {ValuesService} from './core/services/values.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    private subscriptions: Array<any>;

    private pendingSnackbars: Array<string>;
    private snackbarReference: any;
    private isInstanceVisible: boolean;

    loggedIn: boolean;

    constructor(private values: ValuesService, private snackbar: MatSnackBar)
    {
        this.subscriptions = new Array<any>();

        this.pendingSnackbars = new Array<string>();
        this.snackbarReference = null;
        this.isInstanceVisible = false;

        this.loggedIn = false;
    }

    ngOnDestroy(): void
    {
        this.subscriptions.forEach((element) =>
        {
            element.unsubscribe();
        });
    }

    login(): void
    {
        // @ts-ignore
        let username: string = document.getElementById('username').value;
        // @ts-ignore
        let password: string = document.getElementById('password').value;

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        this.values.setUsername(username);
        this.values.setPassword(password);

        this.values.setLoggedIn(true);
    }

    ngOnInit(): void
    {
        //Init logged in state on init
        this.loggedIn = !!localStorage.getItem('loggedIn');

        if(this.loggedIn)
        {
            this.values.setUsername(localStorage.getItem('username'));
            this.values.setPassword(localStorage.getItem('password'));
        }

        //Subscribe to logged in state changes
        this.subscriptions.push(this.values.subLoggedIn().subscribe(() =>
        {
            this.loggedIn = this.values.isLoggedIn();

            localStorage.setItem('loggedIn', String(this.loggedIn));
        }));

        //Subscribe to updating snackbars
        this.subscriptions.push(this.values.subSnackbar().subscribe((message) =>
        {
            this.pendingSnackbars.push(message);

            if(!this.isInstanceVisible)
            {
                this.iterateSnackbars();
            }
        }));
    }

    iterateSnackbars(): void
    {
        let duration: number = 2000;

        if(this.pendingSnackbars.length == 0)
        {
            return;
        }

        if(this.pendingSnackbars.length > 1)
        {
            duration = 1000;
        }

        if(this.pendingSnackbars.length > 3)
        {
            duration = 500;
        }

        if(this.pendingSnackbars.length > 5)
        {
            duration = 200;
        }

        let message = this.pendingSnackbars.shift();
        this.isInstanceVisible = true;

        this.snackbarReference = this.snackbar.open(message, 'Ok',
            {
                duration: duration
            });

        this.snackbarReference.afterDismissed().subscribe(() =>
        {
            this.isInstanceVisible = false;
            this.iterateSnackbars();
        });
    }
}
