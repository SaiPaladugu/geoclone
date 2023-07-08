import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApikeyService {
  private API_KEY_URL = 'http://localhost:5000/api_key';

  constructor(private http: HttpClient) { }

  getApiKey(): Observable<{apiKey: string}> {
    return this.http.get<{apiKey: string}>(this.API_KEY_URL);
  }
}