import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: "root"
})

export class Api {	
	private apiUrl = "http://jhffm19-shn.nwng.eu" 

	constructor(private http: HttpClient) {
		console.log("ready");
	}

	public testConnection() {
		console.log("testing");
		console.log(this.http.get(this.apiUrl));
	}
}