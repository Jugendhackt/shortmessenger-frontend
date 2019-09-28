import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class Api
{
    private apiUrl = 'https://jhffm19-shn.nwng.eu';

    constructor(private http: HttpClient)
    {
    }

    public testConnection()
    {
		this.http.get(this.apiUrl).subscribe((value => console.log(value)))
    }
}
