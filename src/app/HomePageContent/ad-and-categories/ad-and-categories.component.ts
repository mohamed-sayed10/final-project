

import { Component, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../Services/home.service';



@Component({
  selector: 'app-ad-and-categories',
  templateUrl: './ad-and-categories.component.html',
  styleUrls: ['./ad-and-categories.component.css']
})
export class AdAndCategoriesComponent {

  @ViewChild('img') img: ElementRef | undefined;

  scrollUp(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

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



