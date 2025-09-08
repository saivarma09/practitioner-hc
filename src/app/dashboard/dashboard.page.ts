import { Component, OnInit } from '@angular/core';
import { COMMON_MODULES } from '../shared/imports/imports';
import { LOADER_COUNT } from '../shared/constants/loader';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [COMMON_MODULES]
})
export class DashboardPage implements OnInit {
  userInfo = {
    name: 'John Doe'
  };
  loaders = ['','','','']
  constructor() { }

  ngOnInit() {
  }

}
