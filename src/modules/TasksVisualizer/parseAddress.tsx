// eslint-ignore @typescript-eslint/naming-convention
import { GeocodedAddressComponentType } from "../../types/geocode-api";
import {
  GeocodedAddressComponent,
  GeocodedAddressesResponseDto,
} from "../../generated/openapi";

export function parseAddress(geocodedData?: GeocodedAddressesResponseDto) {
  if (!geocodedData) return null;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { address_components } = geocodedData;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const streetNumber = address_components.find(
    (component: GeocodedAddressComponent) =>
      component.types.includes(GeocodedAddressComponentType.STREET_NUMBER),
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const line1 = address_components.find((component: GeocodedAddressComponent) =>
    component.types.includes(GeocodedAddressComponentType.ROUTE),
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const zipCode = address_components.find(
    (component: GeocodedAddressComponent) =>
      component.types.includes(GeocodedAddressComponentType.POSTAL_CODE),
  );

  if (!zipCode) {
    throw new Error("Code postal non reconnu");
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const city = address_components.find((component: GeocodedAddressComponent) =>
    component.types.includes(GeocodedAddressComponentType.LOCALITY),
  );

  if (!city) {
    throw new Error("Ville non reconnue");
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const country = address_components.find(
    (component: GeocodedAddressComponent) =>
      component.types.includes(GeocodedAddressComponentType.COUNTRY),
  );

  if (!country) {
    throw new Error("Pays non reconnu");
  }

  return {
    line1: `${streetNumber?.long_name} ${line1?.long_name}`,
    zipCode: zipCode.long_name,
    city: city.long_name,
    country: country.long_name,
  };
}
