import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductButtonComponent } from './add-product-button.component';

describe('AddProductButtonComponent', () => {
  let component: AddProductButtonComponent;
  let fixture: ComponentFixture<AddProductButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
