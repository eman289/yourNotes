import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = `https://note-sigma-black.vercel.app`;

  signUp(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseURL}/api/v1/users/signUp`,
      userData
    );
  }

  signIn(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseURL}/api/v1/users/signIn`,
      userData
    );
  }
}
