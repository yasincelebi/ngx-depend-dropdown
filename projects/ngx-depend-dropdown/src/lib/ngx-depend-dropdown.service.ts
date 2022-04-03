import { Injectable } from '@angular/core';
import {DropdownData} from "../typings";


@Injectable({
  providedIn: 'root'
})
export class NgxDependDropdownService {
  set data(options: any) {
    this._data = options;
  }

  get data(): any {
    return this._data
  }

  set dropdownConfig(config: any) {
    this.config = config;
  }

  get dropdownConfig(): any {
    return this.config;
  }

  private config: any;

  private _data: DropdownData = [];


  constructor() {

  }





  getNode(node: any) {
    return this._data.find((e: any) => e.name === node);
  }

  getNodeValue(node: any) {
    return this.getNode(node)?.selectedValue;
  }


}
