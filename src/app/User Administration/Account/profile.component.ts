import { Component } from '@angular/core';
import { GlobalService } from '../../Services/global.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  notyf: Notyf;
  userData: any = '';
  userId: any;
  model = {
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  };
  passwordModel = {
    current_password: '',
    new_password: '',
    confirm_password: ''
  };
  constructor(private global: GlobalService, private auth: AuthService, private router: Router) {
    this.notyf = new Notyf();

    auth.getPrfile().subscribe(res => {
      this.model.first_name = res.data.customer_first_name;
      this.model.last_name = res.data.customer_last_name;
      this.model.email = res.data.customer_email;
      this.model.phone = res.data.customer_phone;
      this.userId = res.data.customer_id
    }, (err) => {
      router.navigateByUrl('/')
    })
  }
  handleSubmit(registerForm: any) {
    if (registerForm.valid) {
      this.auth.updateProfile(this.model, this.userId).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('user_name', res.data.customer_first_name);

          this.notyf.success('Update Profile Successfully.');
        },
        (err) => {
          this.notyf.error('Update Profile failed. Please try again.');
        }
      );
    }
  }

  handlePasswordChange(passwordForm: any) {
    if (passwordForm.valid) {
      this.auth.changePassword(this.passwordModel).subscribe(
        (res) => {
          this.passwordModel.current_password = '';
          this.passwordModel.new_password = '';
          this.passwordModel.confirm_password = '';
          passwordForm.resetForm();

          this.notyf.success('Change Password Successfully.');
        },
        (err) => {
          this.notyf.error('Change Password failed. Please try again.');
        }
      );
    }
  }
}
