import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {MatPaginator, MatTableDataSource, MAR} from '@angular/material';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';
import * as decode from 'jwt-decode';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private dataSource;
  private allProducts;
  private isAdmin;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'category', 'withdrawn', 'edit', 'delete'];

  constructor(
    private form: FormBuilder,
    private productService: ProductsService,
    private dialogRef: MatDialog,
    private myStorage: LocalStorageService,
    private route: Router
  ) { }

  
  ngOnInit() {
    this.isAdmin = this.myStorage.getFromLocal('token-decode').user.admin;
    if(this.isAdmin == 0){
      this.route.navigateByUrl('/');
    }
    this.productService.getProducts(0, 20, "ALL","id|ASC").subscribe(
      (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource<any>(response.products);
        this.allProducts = response.products;
      }
    );
  }

  openEditDialog(id: number): void {

    if(this.isAdmin == 0) {
      this.route.navigateByUrl('/');
      return;
    }
    var editModal = this.dialogRef.open(EditProductModalComponent, {
      width: '300px',
      data: {
        name: '',
        description: '',
        category: ''
      }
    });

    editModal.afterClosed().subscribe(
      (response) => { 
        var reply = response
        var counter = 0;
        for(let product of this.allProducts){
          if(product.id === id){
            break;
          }
          counter += 1;
        }
        if(reply.name !== '' || reply.description !== '' || reply.category !== ''){
          this.productService.editProduct(this.allProducts[counter], response).subscribe(
            (response) => {
              console.log(this.allProducts);
            },
            (error) => {
              console.log(error.error.message);
            }
          )
        }
      },
      (error) => {
        console.log(error.error.message);
      }
      );
  }

  openDeleteDialog(id: number): void {
    if(this.isAdmin == 0) {
      this.route.navigateByUrl('/');
      return;
    }
    var deleteModal = this.dialogRef.open(DeleteProductComponent,{
      width: '400px',
      data: {
        reply: ''
      }
    });

    deleteModal.afterClosed().subscribe(
      (response) => {
        if(response.reply == 1){
          this.productService.deleteProduct(id).subscribe(
            (response) => {
              console.log(response);
              var counter = 0;
              for(let p of this.allProducts){
                if(p.id == id){
                  break;
                }
                counter++;
              }
              this.allProducts.splice(counter, 1);
              this.dataSource = new MatTableDataSource<any>(this.allProducts);
            },
            (error) => {
              console.log(error.error.message)
            }
          )
        }
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


@Component({
  selector: 'app-edit-product-modal',
  templateUrl: 'edit-product-modal.component.html'
})

export class EditProductModalComponent {

  constructor(
    private dialog: MatDialogRef<any>,
    private form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any 
  ){

  }

  private editProductForm = this.form.group({
    'name': [''],
    'description': [''],
    'category': ['']
  });

}

@Component({
  selector: 'app-delete-product',
  templateUrl: 'delete-product.component.html'
})

export class DeleteProductComponent{

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ){}

}