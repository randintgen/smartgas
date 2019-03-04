import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  private KANAVAKIS = "https://imgur.com/jVzErYI.jpg";
  private KAFIRIS = "https://imgur.com/F2maxMB.jpg";
  private ALEXAKIS = "https://i.imgur.com/IaCBMbo.jpg";
  private ZARANIS = "https://imgur.com/8OBJaCt.jpg";
  private VASILAKIS = "https://i.imgur.com/4QlRffm.jpg";
  private KAROUZOS = "https://imgur.com/Xb5rgvF.jpg";
  constructor() { }

  ngOnInit() {
  }

}
