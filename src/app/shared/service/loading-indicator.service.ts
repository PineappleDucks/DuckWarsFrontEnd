import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  @Output() event = new EventEmitter<boolean>();
  isLoading = false;

  constructor() { }

  setLoading(value: boolean) {
    this.isLoading = value;
    this.event.emit(this.isLoading);
  }
}
