# ngx-dependent-dropdown - Lightweight Angular component for dependent dropdowns


Table of contents
=================

* [Features](#features)
* [Getting started](#getting-started)
* [API](#api)
* [Change detection](#change-detection)
* [Custom styles](#custom-styles)
* [Validation state](#validation-state)
* [Contributing](#contributing)
* [Development](#development)
* [Inspiration](#inspiration)


## Features
- [x] Create linked dropdowns
- [x] Create dropdowns with custom styles
- [x] Output change event
- [x] HTML5 elements
- [x] Observable change detection and values
- [ ] Custom validation state
- [ ] Custom validation state with custom messages
- [ ] Accessibility
- [ ] Multiselect
- [ ] Mat-Select Support

## Warning
Library is under active development. Please report any issues or suggestions.

## Getting started
### Step 1: Install `ngx-depend-dropdown`:

#### NPM
```shell
npm install --save ngx-depend-dropdown
```
#### YARN
```shell
yarn add ngx-depend-dropdown
```
### Step 2: Import the NgxDependDropdownModule:
```js
import { NgxDependDropdownModule } from 'ngx-depend-dropdown';


@NgModule({
  declarations: [AppComponent],
  imports: [NgxDependDropdownModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Usage
Define options in your consuming component:
```js
@Component({...})
export class ExampleComponent {
  constructor(private dropdownService: DropdownService) {}
  config: DropdownConfig = {
      nodeClass: 'select-1',
      containerClass: 'container',
      unavailableType: 'disabled'
  }
  options: DropdownData = [
    {
      name: 'select-1',
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
      name: 'select-2',
      visibility: () => {

        return !!this.dropdownService.getNodeValue('opt2');
      },
      selectedValue: 1,
      values: [],
      dependent: 'select-1',
      setValues: () => {
        return [{name: 'yasin', id: 1}];
      },
    },
  ];

  change($event: any) {
    console.log($event)
  }
  
}
```
### Usage in template
```html
<ngx-depend-dropdown [options]="options" [config]="config" (onChange)="change($event)"></ngx-depend-dropdown>

```


## API
### Inputs
| Input   	 | Type  	         | Required   	 | Description  	                  |
|-----------|-----------------|-------------|---------------------------------|
| [data]	   | DropdownData	   | 	 true      | Get all selectboxes data.       |
| [config]	 | DropdownConfig	 | 	 true      | Config for selectbox behavior.	 |


### Outputs

| Output   | Description                |
|----------|----------------------------|
| (change) | Fired on selectbox change. | 


### Service Methods

| Output                         | Description                |
|--------------------------------|----------------------------|
| getNode(nodeName: string)      | Gets all node data.        | 
| getNodeValue(nodeName: string) | Gets nodes selected value. | 




## Contributing

Contributions are welcome. Feel free to open an issue or create a pull request.

### Run demo page in watch mode
```
git clone https://github.com/yasincelebi/ngx-depend-dropdown
cd ng-select
npm install
ng build ngx-depend-dropdown
ng serve example --open
```
### Testing
```
ng test
```


### Contributors

I have to thank him both for being an inspiration to me and for making a great contribution to the project.

[Recep Hıdır](https://github.com/windofelm)






