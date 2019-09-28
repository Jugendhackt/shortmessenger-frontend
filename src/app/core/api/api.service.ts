import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Read} from './interfaces/Read.interface';
import {User} from './interfaces/User.interface';
import {Message} from './interfaces/Message.interface';
import {Observable} from 'rxjs';
import {Chat} from './interfaces/Chat.interface';

@Injectable({
    providedIn: 'root'
})

export class Api
{
    private apiUrl = 'https://jhffm19-shm.nwng.eu/api/index.php';

    constructor(private http: HttpClient)
    {

    }

    testConnection()
    {
        this.http.get('https://jhffm19-shm.nwng.eu/').toPromise().then((observable) =>
        {
            console.log(observable);
        }).catch(e =>
        {
            console.warn(e);
        });
    }

    read(offset: number = 0): Observable<Array<Chat>>
    {
        let params = new HttpParams()
            .set('action', 'read')
            .set('username', 'admin')
            .set('password', 'admin');

        return this.http.get<Array<Chat>>(this.apiUrl, {params});
    }

    send(chatId, message): Observable<Message>
    {
        let params = new HttpParams()
            .set('action', 'send')
            .set('username', 'admin')
            .set('password', 'admin');

        let body = {
            chatId: chatId,
            message: message
        };

        return this.http.post<Message>(this.apiUrl, body, {params});
    }

    info()
    {
        let params = new HttpParams()
            .set('action', 'info')
            .set('username', 'admin')
            .set('password', 'admin');

        return this.http.get<User>(this.apiUrl, {params});
    }
}
