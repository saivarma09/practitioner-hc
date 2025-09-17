import { Injectable } from '@angular/core';
import { Success } from '../../models/success';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private successInfo: Success = {
    successMessage: '',
  };

  constructor() { }

  setSuccessInfo(info: any) {
    this.successInfo = info;
  }

  getSuccessInfo() {
    return this.successInfo;
  }


  clearSuccessInfo() {
    this.successInfo = { successMessage: ''};
  }
}
