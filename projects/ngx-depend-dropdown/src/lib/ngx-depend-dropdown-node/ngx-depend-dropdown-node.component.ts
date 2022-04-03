import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {NgxDependDropdownService} from "../ngx-depend-dropdown.service";
import {DropdownNode} from "../../typings";

@Component({
  selector: 'lib-ngx-depend-dropdown-node',
  templateUrl: './ngx-depend-dropdown-node.component.html',
  styleUrls: ['./ngx-depend-dropdown-node.component.css'],


})
export class NgxDependDropdownNodeComponent implements OnInit, AfterViewInit {

  @Input() data!: DropdownNode;

  @Output() selectEvent = new EventEmitter<any>();
  // @ts-ignore
  unavailableType: BehaviorSubject<any> = new BehaviorSubject();
  visibilityType: string = '';
  disabled: BehaviorSubject<any> = new BehaviorSubject(false);
  @ViewChild('selectBox') selectBox: any;

  constructor(private dropdownService: NgxDependDropdownService, private cdr: ChangeDetectorRef) {
  }

  get nodeClass(): string | string[] {
    return this.dropdownService.dropdownConfig?.nodeClass;
  }

  ngOnInit(): void {

    this.getVisibilityType();

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.unavailableType.subscribe((value: boolean) => {
      this.selectBox.nativeElement.disabled = value;
      this.disabled.next(this.selectBox.disabled)
    });
  }

  arrayToObservable(array: Observable<any> | any[]): Observable<any> {
    if (Array.isArray(array)) {
      return of(array)
    }
    return array
  }

  setValue() {
    let val = this.data.setValues();

    let observableArray = this.arrayToObservable(val)

    observableArray.subscribe((values: any) => {
      values.find((item: any) => {
        if (item.id === this.data.selectedValue) {
          this.data.selectedValue = item
        }
      })
      this.data.values = values;
    })
  }

  onChange($event: Event, data: DropdownNode) {
    this.selectEvent.emit({$event, data});

  }

  getVisibilityType(): void {

    this.visibilityType = this.dropdownService.dropdownConfig?.unavailableType

  }

}