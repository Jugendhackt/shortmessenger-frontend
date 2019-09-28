import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Chat } from './interfaces/Chat.interface';

@Injectable({
	providedIn: 'root'
})

export class Api {
	private apiUrl = 'https://jhffm19-shm.nwng.eu/api';

	constructor(private http: HttpClient) {
	
	}

	testConnection() {
		this.http.get('https://jhffm19-shm.nwng.eu/').toPromise().then((observable) => {
			console.log(observable);
		}).catch(e => {
			console.warn(e);
		});
	}

	read() {
		var params = new HttpParams()
			.set("action", "read")
			.set("username", "admin")
			.set("password", "admin")

		return this.http.get<Array<Chat>>(this.apiUrl, {params})
	}
}
