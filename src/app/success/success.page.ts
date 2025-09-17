import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { CommonService } from '../shared/services/common/common-service';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SuccessPage implements OnInit {
  public successInfo:any
  constructor(private navController: NavController, private commonService: CommonService) { }

  ngOnInit() {
    this.successInfo = this.commonService.getSuccessInfo();
  }

  onSecondaryButtonClick(routerLink: string) {
    this.navController.navigateForward(routerLink);
    this.commonService.clearSuccessInfo();
  }

  onPrimaryButtonClick() {
    this.navController.navigateForward('/dashboard');
    this.commonService.clearSuccessInfo();
  }

}
