import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
    email: new FormControl( '', [Validators.required, Validators.email] ),
    password: new FormControl( '', Validators.required )
  });

  constructor(private authService: AuthService,
              private helperService: HelperService,
              private router: Router,
              private loadingIndicator: LoadingIndicatorService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loadingIndicator.setLoading(true);
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService.login(email, password).subscribe(
      resData => {
        this.loadingIndicator.setLoading(false);
        this.loginForm.reset();
        this.router.navigate(['/']).then();
        this.helperService.openSnackBar('Login correct!', 'Close');
      },
      error => {
        this.loginForm.get('password').reset();
        this.loadingIndicator.setLoading(false);
        this.helperService.openSnackBar(error, 'Close');
      }
    );
  }
}
