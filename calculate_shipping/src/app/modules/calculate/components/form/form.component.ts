import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { GeocodingApiService } from '../../../../shared/services/distance-matrix/geocoding-api/geocoding-api.service';
import { OnlyNumber } from '../../../../validators/only-number-validator';
import { AddressModel } from '../../../../shared/models/address.model';

@Component({
  selector: 'app-calculate-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    HttpClientModule,
  ],
  providers: [provideNgxMask(), GeocodingApiService, HttpClient],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  public form!: FormGroup;
  public send: boolean = false;
  public invalidPostalCode: boolean = false;
  public noPostalCode: boolean = false;

  private _addressString: string = '';
  private apiKey: string =
    'HYWscoH4GlNiwAkIZODBeGB3JxguRh4Cz9mdbUt5WMVzxnnTWG3zzTW00MwLGrDW';

  constructor(
    private _formBuild: FormBuilder,
    private _geocodingService: GeocodingApiService
  ) {}

  ngOnInit(): void {
    this._formBuilder();
    this._noNumberChange();
    this._autoFill();

    this.form.get('noPostalCode')?.valueChanges.subscribe((value) => {
      this.noPostalCode = value;
    });
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
      country: [null, Validators.required],
      district: [null, Validators.required],
      number: [null, [OnlyNumber]],
      noNumber: [false],
      noPostalCode: [false],
      complement: [null],
    });
  }

  private _noNumberChange(): void {
    this.form.get('noNumber')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form.get('number')?.disable();
        this.form.get('number')?.setValue(null);
      } else {
        this.form.get('number')?.enable();
      }
    });
  }

  public limitingInputOnlyNumber(event: KeyboardEvent): void {
    if (
      event.key === 'Backspace' ||
      ((event.ctrlKey || event.metaKey) && event.key === 'a')
    ) {
      return;
    }
    const pattern = /[0-9]/;
    let inputChar = event.key;
    if (pattern.test(inputChar)) {
      return;
    }
    event.preventDefault();
  }

  private _getAddress(postalCode: string): void {
    this._geocodingService
      .getGeocodingByPostalCode(postalCode, this.apiKey)
      .subscribe((result) => {
        if (result.result[0].formatted_address === '') {
          this.form.get('postalCode')?.setValue(null);
          this.invalidPostalCode = true;
          return;
        }
        this.invalidPostalCode = false;
        this._addressString = result.result[0].formatted_address;
        this._getValuesAddress(this._addressString);
      });
    // this.enableEndDisableInput(false);
  }

  private _setValuesAddress(addressModel: AddressModel): void {
    this.form.get('street')?.setValue(addressModel.street);
    this.form.get('city')?.setValue(addressModel.city);
    this.form.get('state')?.setValue(addressModel.state);
    this.form.get('country')?.setValue(addressModel.country);
    this.form.get('district')?.setValue(addressModel.district);
  }

  private _getValuesAddress(addressString: string): void {
    let addressModel = new AddressModel();

    let addressArr = addressString.split(',');
    if (addressArr.length != 3) {
      return;
    }
    addressModel.street = addressArr[0].split(' - ')[0];
    addressModel.city = addressArr[1].split(' - ')[0];
    addressModel.state = addressArr[1].split(' - ')[1];
    addressModel.country = addressArr[2];
    addressModel.district = addressArr[0].split(' - ')[1];

    this._setValuesAddress(addressModel);
  }

  private _autoFill(): void {
    this.form.get('postalCode')?.valueChanges.subscribe((value) => {
      const valueString = value as string;
      if (valueString.length === 8) {
        this.enableEndDisableInput(true);
        this._getAddress(valueString);
      }
    });
  }

  private enableEndDisableInput(loadingAddress: boolean): void {
    if (loadingAddress) {
      this.form.get('country')?.disable();
      this.form.get('city')?.disable();
      this.form.get('state')?.disable();
      this.form.get('street')?.disable();
      this.form.get('district')?.disable();
    } else {
      this.form.get('country')?.enable();
      this.form.get('city')?.enable();
      this.form.get('state')?.enable();
      this.form.get('street')?.enable();
      this.form.get('district')?.enable();
    }
  }
}
