import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './interfaces/User.interface';
import {Message} from './interfaces/Message.interface';
import {Observable} from 'rxjs';
import {Chat} from './interfaces/Chat.interface';
import {ValuesService} from '../services/values.service';

@Injectable({
    providedIn: 'root'
})

export class Api
{
    private apiUrl = 'https://jhffm19-shm.nwng.eu/api/index.php';

    private timestamp: number = 0;

    constructor(private http: HttpClient, private values: ValuesService)
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
            .set('username', this.values.getUsername())
            .set('password', this.values.getPassword());

        this.timestamp = Date.now();

        return this.http.get<Array<Chat>>(this.apiUrl, {params});
    }

    send(chatId, message): Observable<Message>
    {
        let params = new HttpParams()
            .set('action', 'send')
            .set('username', this.values.getUsername())
            .set('password', this.values.getPassword());

        let body = new FormData();
        body.append('chatId', chatId);
        body.append('message', message);

        return this.http.post<Message>(this.apiUrl, body, {params});
    }

    info()
    {
        let params = new HttpParams()
            .set('action', 'info')
            .set('username', this.values.getUsername())
            .set('password', this.values.getPassword());

        return this.http.get<User>(this.apiUrl, {params});
    }

    diff(): Observable<any>
    {
        let params = new HttpParams()
            .set('action', 'diff')
            .set('username', this.values.getUsername())
            .set('password', this.values.getPassword())
            .set('timestamp', String(this.timestamp / 1000));

        return this.http.get(this.apiUrl, {params});
    }
}
