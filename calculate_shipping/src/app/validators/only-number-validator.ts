import { AbstractControl } from '@angular/forms';

export function OnlyNumber(control: AbstractControl) {
  const value: string = control.value;
  if (value) {
    const matches = value.match(/\d/g);
    if (!matches || matches.length !== value.length) {
      return { notOnlyNumber: true };
    }
  }
  return null;
}
