import { GeocodingApiService } from './geocoding-api.service';
import { HttpClient } from '@angular/common/http';

describe(GeocodingApiService.name, () => {
  let getGeocodingByPostalCode: string =
    GeocodingApiService.prototype.getGeocodingByPostalCode.name;
  let service: GeocodingApiService;
  let httpClient: HttpClient;

  beforeEach(() => {
    service = new GeocodingApiService(httpClient);
  });

  it('Should throw when postalCode is empty', () => {
    const emptyPostalCode = '';
    const apiKey = 'jahuahahh';
    expect(() =>
      service.getGeocodingByPostalCode(emptyPostalCode, apiKey)
    ).toThrowError('PostalCode or ApiKey can not be empty');
  });

  it('Should throw when apiKey is empty', () => {
    const emptyPostalCode = 'sdfsdfds';
    const apiKey = '';
    expect(() =>
      service.getGeocodingByPostalCode(emptyPostalCode, apiKey)
    ).toThrowError('PostalCode or ApiKey can not be empty');
  });
});
