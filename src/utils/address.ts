export const verifyAddressFormat = (address: string): boolean => {
  const addressRegex = /^(.*),?\s*(\d{5}),?\s*([^,]+)\s*,\s*(.+)/;
  const addressMatches = addressRegex.exec(address);
  return !!addressMatches;
};

interface Address {
  line1: string;
  city: string;
  country: string;
  zipCode: string;
}

export function displayFullAddress({
  line1,
  zipCode,
  city,
  country,
}: Address): string {
  if (![line1, zipCode, city, country].some(Boolean)) return "";

  return `${line1}, ${zipCode} ${city}, ${country}`;
}
