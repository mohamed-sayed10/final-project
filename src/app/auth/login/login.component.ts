import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../Services/global.service";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import 'notyf/notyf.min.css';
import { Notyf } from 'notyf';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private global : GlobalService, private router : Router , private auth : AuthService) {
    this.notyf = new Notyf();
  }

  notyf: Notyf;
  isSubmitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  successLogin: any = null;

  get userData() {
    return this.loginForm.controls
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (res) => {
          if (res.status === 'Success') {
       
            localStorage.setItem('user_token', res.data.token); 
            localStorage.setItem('user_email', res.data.email);
            localStorage.setItem('user_name', res.data.first_name);
            this.global.userName = res.data.first_name;
            this.global.is_login = true;

        
            this.notyf.success('Login Successfully.');

            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 5000);  
          }
        },
        (err) => {

          this.notyf.error(err.error.message || 'An error occurred. Please try again.');
        }
      );
    }
  }

}
