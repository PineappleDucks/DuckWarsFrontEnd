import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: any) {
    return this.http.post('', sub);
  }

  send() {
    return this.http.post('', null);
  }
}
