export const GeocodedAddressType = {
  PREMISE: "premise",
  STREET_ADDRESS: "street_address",
} as const;

export const GeocodedAddressComponentType = {
  POSTAL_CODE: "postal_code",
  STREET_NUMBER: "street_number",
  ROUTE: "route",
  LOCALITY: "locality",
  POLITICAL: "political",
  COUNTRY: "country",
  ADMINISTRATIVE_AREA_LEVEL_1: "administrative_area_level_1",
} as const;

export type GeocodedAddressTypes =
  (typeof GeocodedAddressType)[keyof typeof GeocodedAddressType];
export type GeocodedAddressComponentTypes =
  (typeof GeocodedAddressComponentType)[keyof typeof GeocodedAddressComponentType];

export interface GeocodeApiResponseResultGeometry {
  location_type: string;
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}

export interface GoogleGeocodeApiResponseResultAddressComponent {
  long_name: string;
  short_name: string;
  types: GeocodedAddressComponentTypes[];
}

export interface GoogleGeocodeApiResponseResult {
  address_components: GoogleGeocodeApiResponseResultAddressComponent[];
  formatted_address: string;
  place_id: string;
  geometry: GeocodeApiResponseResultGeometry;
  types: GeocodedAddressTypes[];
}

export interface GoogleGeocodeApiResponse {
  results: GoogleGeocodeApiResponseResult[];
  status: string;
}

export class GoogleGeocodeApi {
  address_components: GoogleGeocodeApiResponseResultAddressComponent;

  formatted_address: string;

  geometry: GeocodeApiResponseResultGeometry;

  place_id: string;

  types: GeocodedAddressTypes[];

  status: string;

  constructor(
    address_components: GoogleGeocodeApiResponseResultAddressComponent,
    formatted_address: string,
    geometry: GeocodeApiResponseResultGeometry,
    place_id: string,
    types: GeocodedAddressTypes[],
    status: string,
  ) {
    this.address_components = address_components;
    this.formatted_address = formatted_address;
    this.geometry = geometry;
    this.place_id = place_id;
    this.types = types;
    this.status = status;
  }
}
