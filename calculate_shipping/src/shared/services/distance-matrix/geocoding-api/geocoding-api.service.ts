import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable()
export class GeocodingAPIService {
  private urlGeocodingBase = environment.apiGeocodingAccurateUrl;
}
