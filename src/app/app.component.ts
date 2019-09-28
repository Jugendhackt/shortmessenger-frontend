import {Component, OnInit} from '@angular/core';
import {ValuesService} from './core/services/values.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    private subscriptions: Array<any>;

    private pendingSnackbars: Array<string>;
    private snackbarReference: any;
    private isInstanceVisible: boolean;

    constructor(private values: ValuesService, private snackbar: MatSnackBar)
    {
        this.subscriptions = new Array<any>();

        this.pendingSnackbars = new Array<string>();
        this.snackbarReference = null;
        this.isInstanceVisible = false;
    }

    ngOnDestroy(): void
    {
        this.subscriptions.forEach((element) =>
        {
            element.unsubscribe();
        });
    }

    ngOnInit(): void
    {
        //Subscribe to updating snackbars
        this.subscriptions.push(this.values.subSnackbar().subscribe((message) =>
        {
            this.pendingSnackbars.push(message);

            if (!this.isInstanceVisible)
            {
                this.iterateSnackbars();
            }
        }));
    }

    iterateSnackbars(): void
    {
        let duration: number = 2000;

        if (this.pendingSnackbars.length == 0)
        {
            return;
        }

        if (this.pendingSnackbars.length > 1)
        {
            duration = 1000;
        }

        if (this.pendingSnackbars.length > 3)
        {
            duration = 500;
        }

        if (this.pendingSnackbars.length > 5)
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
