import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { NgxDependDropdownNodeComponent } from './ngx-depend-dropdown-node.component';
import {NgxDependDropdownService} from "../ngx-depend-dropdown.service";
import {NgxDependDropdownComponent} from "../ngx-depend-dropdown.component";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

import {tickAndDetectChanges} from "../../tests/helper";

describe('NgxDependDropdownNodeComponent', () => {
  let component: NgxDependDropdownNodeComponent;
  let fixture: ComponentFixture<NgxDependDropdownNodeComponent>;
  let parent: NgxDependDropdownComponent;
  let parentFix: ComponentFixture<NgxDependDropdownComponent>;
  let expectedData = {
    name: 'opt1',
    visibility: () => {
      return true;
    },
    placeholder: 'qwewqe',
    values: [{id: 1, name: 'deneme'},{id: 2, name: 'deneme'}],
    selectedValue: 2,
    setValues: () => {
      return [{id: 1, name: 'deneme'},{id: 2, name: 'deneme'}];
    },
  }
  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('NgxDependDropdownService', ['getUser']);
    await TestBed.configureTestingModule({
      declarations: [ NgxDependDropdownNodeComponent, NgxDependDropdownComponent ],
      imports: [FormsModule],
      providers: [ [ {provide: NgxDependDropdownService, useValue: userServiceSpy }]]
    })
    .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(NgxDependDropdownNodeComponent);
    component = fixture.componentInstance;
    parentFix = TestBed.createComponent(NgxDependDropdownComponent);
    parent = parentFix.componentInstance;

    component.data = expectedData;

  });

  afterEach(function(done) {
    done();
  }, 1000);
  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should have a name', () => {
    expect(component.data.name).toBe('opt1');
  });

  it('should have a placeholder', () => {
    expect(component.data.placeholder).toBe('qwewqe');
  });

  it('should have a visibility function', () => {
    expect(component.data.visibility).toBeDefined();
  });

  it('selected value should equal to selected value',  fakeAsync(() => {


    parent.setValues(expectedData);
    component.arrayToObservable(component.data.setValues()).subscribe(data => {
      component.data.selectedValue = expectedData.selectedValue;
      expect(component.data.selectedValue).toEqual(expectedData.selectedValue);
    });
    const e = fixture.debugElement.query(By.css('.depend-dropdown-node-select'))
    var select = e.nativeElement
    console.log(select)
    tickAndDetectChanges(fixture);
    expect(select.value).toEqual(`${component.data.selectedValue.id}: Object`);
  }))


});

