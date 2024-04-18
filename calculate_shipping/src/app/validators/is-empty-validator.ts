import { AbstractControl } from '@angular/forms';

export function IsEmpty(control: AbstractControl) {
  const value: string = control.value;
  if (value == null || value.trim() == '') {
    return { isEmpty: true };
  }
  return null;
}
