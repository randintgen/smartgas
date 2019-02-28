import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ProductsService } from '../../../services/products.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-shop-price-history',
  templateUrl: './shop-price-history.component.html',
  styleUrls: ['./shop-price-history.component.css']
})
export class ShopPriceHistoryComponent implements OnInit {

  private allProducts; 

  private chosenId: number;


  constructor(
    private productService: ProductsService,
    private searchService: SearchService
  ) { }

  displayedColumns: string[] = ['date', 'price'];
  private dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.allProducts = response.products;
      }
    );
  }

  chosenType(id: number): void {
    var makeDate: any = new Date("2014-01-01");

    makeDate = makeDate.toISOString().split("T")[0];

    var today: any = new Date();
    today = today.toISOString().split("T")[0];
    console.log(makeDate);

    console.log(today);
    this.chosenId = id;
    this.searchService.searchShops({
      'products': [id],
      'dateFrom': makeDate,
      'dateTo': today,
      'sort': 'date|DESC'
    }).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<any>(response.products);
        console.log(response);
        console.log(response.products);
      }
    );
  }



}


