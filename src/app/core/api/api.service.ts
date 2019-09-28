import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class Api {
	private apiUrl = 'https://jhffm19-shm.nwng.eu/api/';

	constructor(private http: HttpClient) {
	
	}

	testConnection() {
		this.http.get(this.apiUrl).toPromise().then((observable) => {
			console.log(observable);
		}).catch(e => {
			console.warn(e);
		});
	}
}
