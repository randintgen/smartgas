import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private dataSource;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'category', 'withdrawn', 'edit', 'delete'];

  constructor(
    private form: FormBuilder,
    private productService: ProductsService
  ) { }

  
  ngOnInit() {
    this.productService.getProducts(0, 20, "ALL","id|ASC").subscribe(
      (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource<any>(response.products);
       
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
