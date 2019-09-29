import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Chat} from '../api/interfaces/Chat.interface';

@Injectable({
    providedIn: 'root'
})
export class ValuesService
{
    private darkModeSubject: Subject<void> = new Subject<void>();
    private darkMode: boolean = true;

    private snackbarSubject: Subject<string> = new Subject<string>();

    private mobileSubject: Subject<void> = new Subject<void>();
    private mobile: boolean = false;

    private sidebarOpenSubject: Subject<void> = new Subject<void>();
    private sidebarOpen: boolean = true;

    private noSelectSubject: Subject<void> = new Subject<void>();

    private selectedChatSubject: Subject<void> = new Subject<void>();
    private selectedChat: Chat = {
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
    };;

    private loggedInSubject: Subject<void> = new Subject<void>();
    private loggedIn: boolean = false;

    private username: string;
    private password: string;

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

    getSelectedChat(): Chat
    {
        return this.selectedChat;
    }

    setSelectedChat(chat: Chat): void
    {
        this.selectedChat = chat;
        this.selectedChatSubject.next();
    }

    subSelectedChat(): Subject<void>
    {
        return this.selectedChatSubject;
    }

    isLoggedIn(): boolean
    {
        return this.loggedIn;
    }

    setLoggedIn(state: boolean): void
    {
        this.loggedIn = state;
        this.loggedInSubject.next();
    }

    subLoggedIn(): Subject<void>
    {
        return this.loggedInSubject;
    }

    getUsername(): string
    {
        return this.username;
    }

    setUsername(username: string): void
    {
        this.username = username;
    }

    getPassword(): string
    {
        return this.password;
    }

    setPassword(password: string): void
    {
        this.password = password;
    }
}
