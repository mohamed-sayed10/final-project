import { Component } from '@angular/core';
import { Register } from '../../Interfaces/register';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import {GlobalService} from "../../Services/global.service";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  notyf: Notyf;
  // constructor(private global : GlobalService,private auth: AuthService, private router: Router) { };
  constructor( private global : GlobalService, private auth: AuthService ,  private router: Router ) {
    this.notyf = new Notyf();
  };


  model: Register = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  
  

  handleSubmit(registerForm: any) {
    if (registerForm.valid) {
      this.auth.register(this.model).subscribe(
        (res) => {

          localStorage.setItem('user_token', res.data.token); 
          localStorage.setItem('user_email', res.data.email);
          localStorage.setItem('user_name', res.data.first_name);
          this.global.userName = res.data.first_name;
          this.global.is_login = true;

          this.notyf.success('You have successfully registered!');

          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 5000);  
        },
        (err) => {

          this.notyf.error('Registration failed. Please try again.');
        }
      );
    }
  }


}


