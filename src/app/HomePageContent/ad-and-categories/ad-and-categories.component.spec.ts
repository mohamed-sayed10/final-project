import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAndCategoriesComponent } from './ad-and-categories.component';

describe('AdAndCategoriesComponent', () => {
  let component: AdAndCategoriesComponent;
  let fixture: ComponentFixture<AdAndCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdAndCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdAndCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
