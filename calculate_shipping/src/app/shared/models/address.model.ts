export class AddressModel {
  postalCode: string = '';
  street: string = '';
  number: string | undefined;
  noNumber: boolean = false;
  city: string = '';
  state: string = '';
  country: string = '';
  district: string = '';
}
