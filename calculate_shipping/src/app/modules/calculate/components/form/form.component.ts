import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { OnlyNumber } from '../../../../validators/only-number-validator';
import { IsEmpty } from '../../../../validators/is-empty-validator';

@Component({
  selector: 'app-calculate-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  public form!: FormGroup;
  public send: boolean = false;

  constructor(private _formBuild: FormBuilder) {}

  ngOnInit(): void {
    this._formBuilder();
    this._noNumberChange();
  }

  public submit(): void {
    this.send = true;
  }

  private _formBuilder(): void {
    this.form = this._formBuild.group({
      postalCode: [null, [Validators.required, OnlyNumber]],
      city: [null, Validators.required],
      state: [null, Validators.required],
      street: [null, Validators.required],
      number: [null],
      noNumber: [false],
      complement: [null],
    });
  }

  private _noNumberChange(): void {
    this.form.get('noNumber')?.valueChanges.subscribe((value) => {
      value
        ? this.form.get('number')?.disable()
        : this.form.get('number')?.enable();
    });
  }

  public validatePostalCode(event: KeyboardEvent): void {
    if (
      event.key === 'Backspace' ||
      ((event.ctrlKey || event.metaKey) && event.key === 'a')
    ) {
      return;
    }
    const pattern = /[0-9]/;
    let inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
