import { Component } from '@angular/core';
import { GlobalService } from '../../Services/global.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected to 'styleUrls'
})
export class NavbarComponent {

  notyf: Notyf;


  constructor(public global: GlobalService, private router : Router) { this.notyf = new Notyf();   }


  logout() {
    this.global.userName = '';
    this.global.is_login = false;
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
  
    this.notyf.success('Logout Successfully.');
  
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 3000);  
  }

}




