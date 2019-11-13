import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // tslint:disable-next-line:variable-name
  private _isLoading: boolean;
  isLoadingChange = new Subject<boolean>();

  constructor() { }

  isLoading() {
    return this._isLoading;
  }

  setLoading() {
    this._isLoading = true;
    this.isLoadingChange.next(this._isLoading);
  }

  finishLoading() {
    this._isLoading = false;
    this.isLoadingChange.next(this._isLoading);
  }
}
