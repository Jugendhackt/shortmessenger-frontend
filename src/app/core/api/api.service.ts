import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Chat} from './interfaces/Chat.interface';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Api
{
    private apiUrl = 'https://jhffm19-shm.nwng.eu/api';

    constructor(private http: HttpClient)
    {

    }

    testConnection(): void
    {
        this.http.get('https://jhffm19-shm.nwng.eu/').toPromise().then((observable) =>
        {
            console.log(observable);
        }).catch(e =>
        {
            console.warn(e);
        });
    }

    read(): Observable<Array<Chat>>
    {
        let params = new HttpParams()
            .set('action', 'read')
            .set('username', 'admin')
            .set('password', 'admin');

        console.log(this.apiUrl + '?' + params.toString());

        return this.http.get<Array<Chat>>(this.apiUrl, {params});
    }
}
