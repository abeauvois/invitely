import { Address } from "../../types/Address";

export function buildFormattedAddress(address: Address) {
  return `${address.line1}, ${address.zipCode}  ${address.city}, ${address.country}`;
}
