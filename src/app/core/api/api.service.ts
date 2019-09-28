import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Chat } from './interfaces/Chat.interface';
import { Observable } from 'rxjs';
import { Read } from './interfaces/Read.interface';

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

	read(offset:number = 0) {
		var params = new HttpParams()
			.set("action", "read")
			.set("username", "admin")
			.set("password", "admin")

		return this.http.get<Read>(this.apiUrl, {params})
	}

	send(chatId, message) {
		var params = new HttpParams()
			.set("action", "send")
			.set("username", "admin")
			.set("password", "admin")
			.set("chatId", chatId)
			.set("message", message)

		var body = {
			chatId: chatId,
			message: message
		}

		return this.http.post(this.apiUrl, body, {params})
	}

	info() {
		var params = new HttpParams()
			.set("action", "info")
			.set("username", "admin")
			.set("password", "admin")

		return this.http.get<User>(this.apiUrl, {params})
	}
}