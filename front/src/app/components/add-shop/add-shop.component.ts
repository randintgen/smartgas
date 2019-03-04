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
      {value: 'alysida-0', viewValue: 'JETOIL'},
      {value: 'alysida-1', viewValue: 'Shell'},
      {value: 'alysida-2', viewValue: 'ETEKA'},
      {value: 'alysida-3', viewValue: 'AVIN'},
      {value: 'alysida-4', viewValue: 'AEGEAN'},
      {value: 'alysida-5', viewValue: 'EKO'},
      {value: 'alysida-6', viewValue: 'REVOIL'},
      {value: 'alysida-7', viewValue: 'BP'},
      {value: 'alysida-8', viewValue: 'ΕΛΙΝΟΙΛ'},
      {value: 'alysida-9', viewValue: 'DRACOIL'},
      {value: 'alysida-10', viewValue: 'CYCLON'},
      {value: 'alysida-11', viewValue: 'KMOIL'},
      {value: 'alysida-12', viewValue: 'EL-PETROIL'},
      {value: 'alysida-13', viewValue: 'ΑΡΓΩ'},
      {value: 'alysida-14', viewValue: 'KAOIL'},
      {value: 'alysida-15', viewValue: 'MEDOIL'},
      {value: 'alysida-16', viewValue: 'ΤΡΙΑΙΝΑ'},
      {value: 'alysida-17', viewValue: 'CRETA PETROL'},
      {value: 'alysida-18', viewValue: 'WIN'},
      {value: 'alysida-19', viewValue: 'FISIKON'},
      {value: 'alysida-20', viewValue: 'VALIN'},
      {value: 'alysida-21', viewValue: 'Silkoil'},
      {value: 'alysida-22', viewValue: 'Α.Π.'},
      {value: 'alysida-23', viewValue: 'Άλλο'}
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
        this.initLat = results[0].y;
        this.initLng = results[0].x;
        
      }else {
        this.addressedFound = results;
        this.openListDialog();
      }
    })
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
        console.log(labelChosen);
        this.addShopForm.controls['address'].setValue(labelChosen);
      }
    )

  }

  private addShopAttempt(): void {

    var shopName = this.addShopForm.controls['name'].value;
    var shopAdd = this.addShopForm.controls['address'].value;
    var shopTags = this.addShopForm.controls['tags'].value;

    console.log(shopName, shopAdd, shopTags);
    var addRequest = this.shopService.createShop(shopName, shopAdd, [shopTags]).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  };

  private findCurrentLoc(): void {

    var basicUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&';

    const provider = new OpenStreetMapProvider();

    var locator = navigator.geolocation.getCurrentPosition(
      (result) =>{
        var lon = 'lon=' + result.coords.longitude;
        var lat = '&lat=' + result.coords.latitude;

        basicUrl += lon + lat;

        this.http.get(basicUrl, {
          headers: new HttpHeaders({
            'Content-Type': 'text/plain'
          })
        }).subscribe(
          (final) => {
            console.log(final);
            this.addShopForm.controls['address'].setValue(final['display_name']);
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