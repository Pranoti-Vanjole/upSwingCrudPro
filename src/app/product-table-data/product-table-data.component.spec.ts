import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableDataComponent } from './product-table-data.component';

describe('ProductTableDataComponent', () => {
  let component: ProductTableDataComponent;
  let fixture: ComponentFixture<ProductTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
