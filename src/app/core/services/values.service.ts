import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ValuesService
{
    private darkModeSubject: Subject<void> = new Subject<void>();
    private darkMode: boolean = false;

    private snackbarSubject: Subject<string> = new Subject<string>();

    private mobileSubject: Subject<void> = new Subject<void>();
    private mobile: boolean = false;

    private sidebarOpenSubject: Subject<void> = new Subject<void>();
    private sidebarOpen: boolean = true;

    private noSelectSubject: Subject<void> = new Subject<void>();

    private sessionStart: boolean = true;

    constructor()
    {
    }

    getDarkMode(): boolean
    {
        return this.darkMode;
    }

    setDarkMode(darkMode: boolean): void
    {
        this.darkMode = darkMode;
        this.darkModeSubject.next();
    }

    subDarkMode(): Subject<void>
    {
        return this.darkModeSubject;
    }

    subSnackbar(): Subject<string>
    {
        return this.snackbarSubject;
    }

    pushToSnackbar(message: string): void
    {
        this.snackbarSubject.next(message);
    }

    getMobile(): boolean
    {
        return this.mobile;
    }

    setMobile(mobile: boolean): void
    {
        this.mobile = mobile;
        this.mobileSubject.next();
    }

    subMobile(): Subject<void>
    {
        return this.mobileSubject;
    }

    getSidebarOpen(): boolean
    {
        return this.sidebarOpen;
    }

    setSidebarOpen(state: boolean): void
    {
        this.sidebarOpen = state;
        this.sidebarOpenSubject.next();
    }

    subSidebarOpen(): Subject<void>
    {
        return this.sidebarOpenSubject;
    }

    getSessionStart(): boolean
    {
        return this.sessionStart;
    }

    endSessionStart(): void
    {
        this.sessionStart = false;
    }

    tabNoSelect(): void
    {
        this.noSelectSubject.next();
    }

    subNoSelect(): Subject<void>
    {
        return this.noSelectSubject;
    }
}
