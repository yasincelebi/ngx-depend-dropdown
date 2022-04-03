import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {NgxDependDropdownService} from "./ngx-depend-dropdown.service";
import {Observable, of} from "rxjs";
import {DropdownConfig, DropdownData, DropdownNode} from "../typings";


@Component({
  selector: 'ngx-depend-dropdown',
  templateUrl: `ngx-depend-dropdown.component.html`,
  styles: []
})
export class NgxDependDropdownComponent implements OnInit, AfterViewInit {
  @Input() data: DropdownData = []
  @Input() config: DropdownConfig = {}
  @Output() onChange: EventEmitter<{ nativeEvent: Event, changedDropdown: DropdownNode, fullData: DropdownData }> = new EventEmitter()
  @ViewChildren('dropdown') dropdown: any

  constructor(private dropdownService: NgxDependDropdownService) {


  }

  ngAfterViewInit() {
    this.data.forEach((item, index: any) => {
      if (!item.visibilityValue && this.config.unavailableType === 'disabled') {
        this.dropdown.toArray()[index].unavailableType.next('disabled')
      }
    })

  }


  ngOnInit(): any {


    this.dropdownService.data = this.data;
    this.dropdownService.dropdownConfig = this.config;
    this.init()
  }

  arrayToObservable(array: Observable<any> | any[]): Observable<any> {
    if (Array.isArray(array)) {
      return of(array)
    }
    return array
  }

  select(args: { $event: Event, data: DropdownNode }): void {
    this.data.forEach((node: DropdownNode, index: any) => {

      if (args.data.name === node.dependent) {
        this.setValues(node)
        node.selectedValue = null
      }

      const nodeValue = this.dropdownService.getNodeValue(node?.dependent)

      if (node.dependent && !nodeValue) {
        node.selectedValue = null
      }


      node.visibilityValue = node.visibility() || false
      const isDisabled = !node.visibilityValue && this.config.unavailableType === 'disabled' && node.dependent
      this.dropdown.toArray()[index].unavailableType.next(isDisabled)

    })

    this.onChange.emit({nativeEvent: args.$event, changedDropdown: args.data, fullData: this.data})
  }

  init() {

    this.data.forEach((node: DropdownNode) => {

      if (!node.placeholder) {
        node.placeholder = 'Select'
      }

      node.visibilityValue = node.visibility();
      node.selectedValue = node.selectedValue || null
     this.setValues(node)

    });


  }

  setValues(node: DropdownNode){
    let val = node.setValues();

    let observableArray = this.arrayToObservable(val)

    observableArray.subscribe((values: any) => {
      values.find((item: any) => {
        if (item.id === node.selectedValue) {
          node.selectedValue = item
        }
      })
      node.values = values;
    })
  }


}
