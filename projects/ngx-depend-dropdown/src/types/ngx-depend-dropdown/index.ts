declare module 'NgxDependDropdown' {
  import { Observable } from 'rxjs';
  export interface DropdownNode {
    name: string;
    visibility: (node?: Node) => boolean;
    selectedValue?: any;
    values: any[];
    setValues: (node?: Node) => Observable<any[]> | any[];
    dependent?: string | string[];
    visibilityValue?: boolean;
    placeholder?: string;
    label?: string;
    required?: string | boolean;
    errorMessage?: string;
    isMultiple?: boolean;
  }

  export type DropdownData = DropdownNode[];

  export interface DropdownConfig {
    unavailableType?: UnavailableDropdownType;
    containerClass?: string | string[];
    nodeClass?: string | string[];
  }
  export type UnavailableDropdownType = 'disabled' | 'invisible';
}
