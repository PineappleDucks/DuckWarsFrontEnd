import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {AuthService} from '../../auth/auth.service';

import {LoginComponent} from '../../auth/login/login.component';
import {RegisterComponent} from '../../auth/register/register.component';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  isLogin = false;
  gameActive = true;

  private sub: Subscription;

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.authService.user.subscribe( user => {
      const isAuth = !!user;

      if (isAuth) {
        this.isLogin = true;
      } else {
        setTimeout( () => {
          this.openLoginDialog();
        }, 200);
      }
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        // check if true
      } else if (result === 'register') {
        this.openRegisterDialog();
      }
    });
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'registered') {
        // check if true
      } else if (result === 'login') {
        this.openLoginDialog();
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onStart() {
    if (this.gameActive) {
      this.router.navigate(['chat']).then();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
