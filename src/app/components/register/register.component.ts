import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/auth/login.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  img = '../../../assets/portada.jpg';
  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.RegisterForm = this.fb.group({
      'name': ['', Validators.required],
      'paternalSurname': ['', Validators.required],
      'maternalSurname': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }

  onRegister() {
    this.alert.confirm().then(res => {
      if (res.value) {
        this.auth.postUser(this.RegisterForm.value).subscribe(res => {
          this.alert.success().then(res => {
            this.router.navigate(['login']);
          });
        }, err => {
          this.alert.error('Opps', err.errors);
        });
      }
    });
  }

  get f() { return this.RegisterForm.controls; }

}
