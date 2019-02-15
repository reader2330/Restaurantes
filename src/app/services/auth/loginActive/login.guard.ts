import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';

import {LoginService} from '../login.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    validate = false;
    constructor(private userS: LoginService, private router: Router) {
    }

    async canActivate() {
      if (this.userS.getToken()) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
}
