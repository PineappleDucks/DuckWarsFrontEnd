import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {MyErrorStateMatcher, MyErrorStateMatcherPassword} from '../../shared/MyErrorStateMatcher';

import {AuthService} from '../auth.service';
import {LoadingIndicatorService} from '../../shared/service/loading-indicator.service';
import {HelperService} from '../../shared/service/helper.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  matcherPassword = new MyErrorStateMatcherPassword();

  hidePassword = true;
  hidePasswordConfirm = true;

  registerForm = new FormGroup({
    username: new FormControl( '', [Validators.required] ),
    password: new FormControl( '', Validators.required ),
    passwordConfirm: new FormControl( '', Validators.required )
  }, { validators: this.checkPasswords });

  constructor(private authService: AuthService,
              private helperService: HelperService,
              private router: Router,
              private loadingIndicator: LoadingIndicatorService,
              public dialogRef: MatDialogRef<RegisterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) {}

  ngOnInit() {

  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    this.loadingIndicator.setLoading(true);
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;

    this.authService.register(username, password).subscribe(
      resData => {
        this.loadingIndicator.setLoading(false);
        this.registerForm.reset();
        this.helperService.openSnackBar('Registrierung abgeschlossen!', 'Schließen');

        this.dialogRef.close('registered');
      },
      error => {
        this.registerForm.get('password').reset();
        this.registerForm.get('passwordConfirm').reset();
        this.loadingIndicator.setLoading(false);
        this.helperService.openSnackBar(error, 'Schließen');
      }
    );
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('passwordConfirm').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onLogin() {
    this.dialogRef.close('login');
  }
}
