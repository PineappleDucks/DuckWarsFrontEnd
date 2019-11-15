import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Schließen', duration: number = 2000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
