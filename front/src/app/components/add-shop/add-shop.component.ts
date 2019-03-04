/* h0jFc3fSZKxCaswDGmS9 */
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Alysida {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {

  private syntagmaSquareLoc = [23.734837, 37.975655];
  private initLat=37.975655;
  private initLng=23.734837;
  private addressedFound;
  private finalResults;
  private fromHere: boolean = false;
  private fromSearch: boolean = false;
  private fromDefault: boolean = true;
  private shopAdd;
  private shopTags;
  private shopName;
  private lon;
  private llon;
  private llat;
  private lat;

  constructor(
    private form: FormBuilder,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router,
    private myStorage: LocalStorageService,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  private addShopForm = this.form.group({
    'name': [''],
    'address': [''],
    'city': [''],
    'tk': [''],
    'tags': ['']
  });

  

  alysides: Alysida[] = [
      {value: 'Shell', viewValue: 'Shell'},
      {value: 'ETEKA', viewValue: 'ETEKA'},
      {value: 'Silk Oil', viewValue: 'Silk Oil'},
      {value: 'Revoil', viewValue: 'Revoil'},
      {value: 'Elin', viewValue: 'Elin'},
      {value: 'EKO', viewValue: 'EKO'},
      {value: 'Α.Π.', viewValue: 'Α.Π.'},
      {value: 'Aegean', viewValue: 'Aegean'},
      {value: 'BP', viewValue: 'BP'},
      {value: 'AVIN', viewValue: 'AVIN'},
    ];

    
  ngOnInit() {
    if(!this.myStorage.getFromLocal('username')){
      this.router.navigateByUrl('');
    }
  }

  private find() : void {
    
    var location = this.addShopForm.controls['address'].value;

    const provider = new OpenStreetMapProvider();

    const nav = provider.search({
      query: location
    }).then((results) => {
      console.log(results);
      if(results.length === 0){
        console.error('No results!');
      }else if(results.length === 1){
        this.initLat = parseFloat(results[0].y);
        this.initLng = parseFloat(results[0].x);
        console.log(this.initLat, typeof(this.initLat));
      }else {
        this.addressedFound = results;
        this.openListDialog();
      }
    });
  }

  openListDialog(): void {

    var list = this.dialog.open(ResultListComponent, {
      width: '500px',
      data: {
        list: this.addressedFound,
        chosen: ''
      }
    });

    list.afterClosed().subscribe(
      (answer) => {
        var chosenId = answer.id;
        var labelChosen = answer.list[chosenId].label;
        this.initLat = parseFloat(answer.list[chosenId].y);
        this.initLng = parseFloat(answer.list[chosenId].x);
        console.log(labelChosen);
        this.addShopForm.controls['address'].setValue(labelChosen);
      }
    )

  }

  private addShopAttempt(): void {

    this.shopName = this.addShopForm.controls['name'].value;
    this.shopAdd = this.addShopForm.controls['address'].value;
    this.shopTags = this.addShopForm.controls['tags'].value;

    const provider = new OpenStreetMapProvider();

    const nav = provider.search({
      query: this.shopAdd
    }).then((results) => {
      console.log(results);
      if(results.length === 0){
        console.error('No results!');
      }else if(results.length === 1){
        this.initLat = parseFloat(results[0].y);
        this.initLng = parseFloat(results[0].x);
        this.shopService.createShop(this.shopName, this.shopAdd, this.shopTags, this.initLng, this.initLat).subscribe(
          (response) => {
            console.log('add', response);
            this.router.navigateByUrl('/shops/'+ response.id);
          },
          (error) => {
            console.log('add', error);
          }
        );
      }else {
        this.addressedFound = results;
        this.openListDialogAdd();
      }
    });
  };


  openListDialogAdd(): void {

    var list = this.dialog.open(ResultListComponent, {
      width: '500px',
      data: {
        list: this.addressedFound,
        chosen: ''
      }
    });

    list.afterClosed().subscribe(
      (answer) => {
        var chosenId = answer.id;
        console.log(answer);
        var labelChosen = answer.list[chosenId].label;
        this.shopService.createShop(this.shopName, this.shopAdd, this.shopTags, this.initLng, this.initLat).subscribe(
          (response) => {
            this.router.navigateByUrl('/shops/' + response.id);
          },
          (error) => {
            console.log('add', error);
          }
        );
      }
    )

  }

  private findCurrentLoc(): void {

    var basicUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&';

    const provider = new OpenStreetMapProvider();

    var locator = navigator.geolocation.getCurrentPosition(
      (result) =>{
        this.lon = 'lon=' + result.coords.longitude;
        this.lat = '&lat=' + result.coords.latitude;

        basicUrl += this.lon + this.lat;

        this.llon = result.coords.longitude;
        this.llat = result.coords.latitude;

        this.http.get(basicUrl, {
          headers: new HttpHeaders({
            'Content-Type': 'text/plain'
          })
        }).subscribe(
          (final) => {
            console.log(final);
            this.addShopForm.controls['address'].setValue(final['display_name']);
            this.initLat = parseFloat(this.llat);
            this.initLng = parseFloat(this.llon);
            console.log(this.initLat, typeof(this.initLat))
          },
          (error) => {
            console.log(error);
          }
        )
      }
    )

  }
}

@Component({
  selector: 'app-result-list',
  templateUrl: 'result-list.component.html'
})

export class ResultListComponent implements OnInit{

  private displayedColumns;
  private dataSource;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<any>
  ){}

  ngOnInit(){

    var onlyInmportant = this.data.list;
    var keeping = [];
    var id = 0;
    for(let temp of onlyInmportant){
      var otherTemp = temp.label.split(',');
      var counter = 0;
      var word = '';
      for(let x of otherTemp){
        word += x;
        if(counter == 3){
          break;
        }
        counter += 1;
      }
      id += 1;
      keeping.push({street: word, id: id});
    }

    console.log(keeping);

    this.displayedColumns = ['address', 'tochoose'];
    this.dataSource = keeping;

  }

  choose(id: number){
    this.data.chosen = id;
  }


}