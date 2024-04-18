import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GeocodingApiService {
  private _urlGeocodingBase = environment.apiGeocodingAccurateUrl;
  private _apiKey =
    '7FQrZ0Ud1i3w4lR7upy0cxTdV9sjNzQL30FQL6MIssLvq7zI2hwZJOCDymRX8ZHa';

  constructor(private _httpClient: HttpClient) {}

  public getGeocodingByPostalCode(
    postalCode: string,
    apiKey: string
  ): Observable<any> {
    if (postalCode.trim() === '' || apiKey.trim() === '') {
      throw Error('PostalCode or ApiKey can not be empty');
    }
    return this._httpClient.get<any>(
      `${this._urlGeocodingBase}${postalCode}&Key=${apiKey}`
    );
  }
}
