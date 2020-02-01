import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';

import {AuthService} from '../auth.service';
import {LoadingIndicatorService} from '../../shared/service/loading-indicator.service';
import {HelperService} from '../../shared/service/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  loginForm = new FormGroup({
    username: new FormControl( '', Validators.required ),
    password: new FormControl( '', Validators.required )
  });

  hidePassword = true;

  constructor(private authService: AuthService,
              private helperService: HelperService,
              private router: Router,
              private loadingIndicator: LoadingIndicatorService,
              public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.loadingIndicator.setLoading(true);
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService.login(username, password).subscribe(
      resData => {
        this.loadingIndicator.setLoading(false);
        this.loginForm.reset();
        this.helperService.openSnackBar('Login erfolgreich!', 'Schließen');

        this.dialogRef.close('login');
      },
      error => {
        this.loginForm.get('password').reset();
        this.loadingIndicator.setLoading(false);
        this.helperService.openSnackBar(error, 'Schließen');
      }
    );
  }

  onRegister() {
    this.dialogRef.close('register');
  }
}
