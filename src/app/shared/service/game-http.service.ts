import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Message} from '../model/Message';
import {DialogOption} from '../model/DialogOption';
import {Init} from '../model/Init';

@Injectable({
  providedIn: 'root'
})
export class GameHttpService {
  private api = environment.api;
  private initRoute = environment.initRoute;
  private messageRoute = environment.messageRoute;

  constructor(private http: HttpClient) { }

  // github aktuellen stand
  init() {
    console.log('post: ' + this.api + this.initRoute);
    return this.http.post<Init>(this.api + this.initRoute, {});
  }

  // github nachrichtSenden
  message(dialogOption: DialogOption) {
    console.log('post: ' + this.api + this.messageRoute);
    return this.http.post<Message>(this.api + this.messageRoute, dialogOption);
  }
}
