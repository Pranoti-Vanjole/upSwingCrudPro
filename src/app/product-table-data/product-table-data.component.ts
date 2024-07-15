import { Component } from '@angular/core';
import { Product } from '../shared/models/product-model';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ProductServiceService } from '../shared/service/product-service.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-product-table-data',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,TableModule,
    ButtonModule,
    InputTextModule,
    NgxChartsModule
    ],
  templateUrl: './product-table-data.component.html',
  styleUrl: './product-table-data.component.css'
})
export class ProductTableDataComponent {
  showForm: boolean = false;
  products: Product[] = [];
  selectedProduct: Product | null = null;
  productForm: FormGroup | any;
  isEdit = false; 
  
  constructor(private fb: FormBuilder, private productserve : ProductServiceService ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['',  Validators.required],
      price: [null, Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.productserve.getProducts().subscribe(products => this.products = products);
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.isEdit) {
        this.productserve.updateProduct(product);
        this.isEdit = false;
      } else {
        product.id = this.products.length + 1;
        this.productserve.addProduct(product);
      }
      this.productForm.reset();
    }
  }

  editProduct(product: Product) {
    this.productForm.setValue(product);
    this.isEdit = true;
  }

  deleteProduct(id: number) {
    this.productserve.deleteProduct(id);
  }

  onSelection(event: any) {
    const selectedProduct: Product = event.data;
    this.editProduct(selectedProduct);
  } 
  
}

