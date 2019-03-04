import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shop-prices',
  templateUrl: './shop-prices.component.html',
  styleUrls: ['./shop-prices.component.css']
})
export class ShopPricesComponent implements OnInit {

  @Input() shopId;

  private results; 

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) { }
  
  displayedColumns: string[] = ['id', 'type', 'price', 'dayFrom'];
  private dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    console.log('edo eimaste', this.shopId);
    this.searchService.searchShops({
      shops: [this.shopId],
      sort: "date|DESC"
    }).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<any>(response.prices);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

}
