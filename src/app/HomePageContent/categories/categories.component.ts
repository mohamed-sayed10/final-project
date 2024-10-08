

import { Component } from '@angular/core';
import { HomeService } from '../../Services/home.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  
  categories:any = [];
  bottomCategories:any;

  constructor(private home :HomeService){}

  ngOnInit()
  {
    this.home.topCategory().subscribe(res=>{
      this.categories = res.data
    })
    this.home.category().subscribe(res=>{
      this.bottomCategories = res.data;
    })
  }

}
