import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {NgxDependDropdownService} from "../../../ngx-depend-dropdown/src/lib/ngx-depend-dropdown.service";
import {DropdownConfig, DropdownData} from "../../../ngx-depend-dropdown/src/typings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'example';
  data: DropdownData = [];
  dropdownConfig: DropdownConfig = {}

  constructor(private http: HttpClient, private dropdownService: NgxDependDropdownService) {
  }

  ngOnInit(): void {
    this.setData();
    this.dropdownConfig = {
      unavailableType: 'disabled',
      containerClass: ['container', 'row'],
      nodeClass: ['some-class'],
    }
  }

  setData() {
    this.data = [
      {
        name: 'opt1',
        visibility: () => {
          return true;
        },
        selectedValue: 1,
        placeholder: 'placeholder',
        values: [],
        setValues: () => {
          return this.http
            .get('https://jsonplaceholder.typicode.com/users')
            .pipe(
              map((data: any) => {
                return data.map((item: any) => {

                  return {
                    name: item.name,
                    id: item.id,
                  };
                });
              })
            );

        },
      },
      {
        name: 'opt2',
        visibility: () => {
          return !!this.dropdownService.getNodeValue('opt1');
        },
        selectedValue: null,
        values: [],
        dependent: 'opt1',
        setValues: () => {

          return this.http
            .get('https://jsonplaceholder.typicode.com/users')
            .pipe(
              map((data: any) => {
                return data.map((item: any) => {
                  return {
                    name: item.name,
                    id: item.id,
                  };
                });
              })
            );


        },
      },
      {
        name: 'opt3',
        visibility: () => {
          return !!this.dropdownService.getNodeValue('opt2');
        },
        selectedValue: null,
        values: [],

        dependent: 'opt2',
        setValues: () => {
          return [{name: 'yasin', id: 1}];
        },
        label: 'selam',
        required: true,
        errorMessage: 'error message',
      },
      {
        name: 'opt3',
        visibility: () => {

          return true;
        },
        selectedValue: null,
        values: [],


        setValues: () => {
          return [{name: 'yasin', id: 1}];
        },
      }
    ];


  }



  change($event: any) {
    console.log($event)
  }


}


