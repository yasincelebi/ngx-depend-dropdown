import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDependDropdownComponent } from './ngx-depend-dropdown.component';

import { isObservable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDependDropdownNodeComponent } from './ngx-depend-dropdown-node/ngx-depend-dropdown-node.component';
import { FormsModule } from '@angular/forms';
import { NgxDependDropdownService } from './ngx-depend-dropdown.service';
import { CommonModule } from '@angular/common';
import { DropdownData } from 'NgxDependDropdown';

describe('NgxDependDropdownComponent', () => {
  let component: NgxDependDropdownComponent;
  let fixture: ComponentFixture<NgxDependDropdownComponent>;

  let dropdownService: NgxDependDropdownService;
  let expectedData: DropdownData = [
    {
      name: 'opt1',
      visibility: () => {
        return true;
      },
      placeholder: 'qwewqe',
      values: [],

      selectedValue: 2,
      setValues: () => {
        return [
          { id: 1, name: 'deneme' },
          { id: 2, name: 'deneme' },
        ];
      },
    },
    {
      name: 'opt2',
      visibility: () => {
        return true;
      },
      selectedValue: 2,
      values: [],

      setValues: () => {
        return [{ id: 2, name: 'denememe' }];
      },
    },
    {
      name: 'opt3',
      visibility: () => {
        return true;
      },
      selectedValue: 2,
      values: [],

      setValues: () => {
        return [{ name: 'yasin', id: 1 }];
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxDependDropdownComponent,
        NgxDependDropdownNodeComponent,
      ],
      imports: [FormsModule, CommonModule, BrowserModule],
      providers: [NgxDependDropdownService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDependDropdownComponent);
    component = fixture.componentInstance;
    dropdownService = TestBed.inject(NgxDependDropdownService);
    component.data = expectedData;

    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data', () => {
    expect(component.data).toBeTruthy();
  });

  it('should have expected data', () => {
    component.data = expectedData;
    component.ngOnInit();
    expect(component.data).toEqual(expectedData);
  });

  it('dropdown viewchild should be element', () => {
    expect(component.dropdown).toBeTruthy();
  });

  it('arrayToObservable should return observable', () => {
    const expected = [{ id: 1, name: 'deneme' }];
    const result = component.arrayToObservable(expected);
    result.subscribe((data) => {
      expect(data).toEqual(expected);
    });
    expect(isObservable(result)).toBe(true);
  });

  it('select event should be called', () => {
    spyOn(component, 'select').and.callThrough();
    const e = fixture.debugElement.nativeElement.querySelectorAll(
      '.depend-dropdown-node-select'
    );
    // change the select elements value
    const select = e[0];
    select.value = select.options[1].value; // <-- select a new value
    const event = new Event('change');
    select.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.select).toHaveBeenCalledTimes(1);
    expect(component.select).toHaveBeenCalledWith({
      $event: event,
      data: expectedData[0],
    });
    expect(component.data[0].selectedValue).toEqual(expectedData[0].values[0]);
  });
});
