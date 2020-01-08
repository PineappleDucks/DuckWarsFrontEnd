import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Message} from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class GameHttpService {
  private api = environment.api;
  private initRoute = environment.initRoute;
  private sendMessageRoute = environment.sendMessageRoute;
  private getPossibleResponsesRoute = environment.getPossibleResponsesRoute;

  constructor(private http: HttpClient) { }

  // github aktuellen stand
  init(side: string) {
    const params = new HttpParams().set('side', side);

    console.log('get: ' + this.api + this.initRoute);
    return this.http.get(this.api + this.initRoute, { params });
  }

  // github nachrichtSenden
  sendMessage(message: Message) {
    console.log('post: ' + this.api + this.sendMessageRoute);
    return this.http.post(this.api + this.sendMessageRoute, message);
  }

  // github getMoeglicheAntworten
  getPossibleResponses(message: Message) {
    console.log('post: ' + this.api + this.getPossibleResponsesRoute);
    return this.http.post(this.api + this.getPossibleResponsesRoute, message);
  }
}
