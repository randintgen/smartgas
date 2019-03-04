import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ProductsService } from '../../../services/products.service';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-price-history',
  templateUrl: './shop-price-history.component.html',
  styleUrls: ['./shop-price-history.component.css']
})
export class ShopPriceHistoryComponent implements OnInit {

  private allProducts; 

  private chosenId: number=1;


  constructor(
    private productService: ProductsService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) { }

  displayedColumns: string[] = ['date', 'name', 'price'];
  private dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.allProducts = response.products;
      }
    );

    const id = this.route.snapshot.paramMap.get('id');
    var makeDate: any = new Date("2014-01-01");

    makeDate = makeDate.toISOString().split("T")[0];

    var today: any = new Date();
    today = today.toISOString().split("T")[0];
    console.log(makeDate);

    console.log(today);
    this.chosenId = 1;
    this.searchService.searchShops({
      'dateFrom': makeDate,
      'dateTo': today,
      'sort': 'date|DESC',
      'shops': id
    }).subscribe(
      (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource<any>(response.prices);
        this.dataSource.paginator = this.paginator;
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
        console.log(response);
        this.dataSource = new MatTableDataSource<any>(response.prices);
        this.dataSource.paginator = this.paginator;
      }
    );
  }



}


