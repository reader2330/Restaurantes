import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/auth/login.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  img = '../../../assets/portada.jpg';
  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.LoginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  get f() { return this.LoginForm.controls; }

  onLogin() {
    this.alert.confirm().then(res => {
      if (res.value) {
        this.auth.postLogin(this.LoginForm.value).subscribe(res => {
          console.log(res);
          this.auth.setToken(res['token']);
          this.alert.success().then(() => {
            this.router.navigate(['inicio']);
          });
        });
      }
    });
  }

  goRegister() {
    this.router.navigate(['registrar']);
  }


}
