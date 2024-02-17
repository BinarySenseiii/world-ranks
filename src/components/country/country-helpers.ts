import { CountryData } from '@/api/_types';

export const filterData = (country: CountryData, search: (property: string) => boolean) => {
  const name = country.name.common.toLowerCase();
  const countryRegion = country.region.toLowerCase();
  const subRegion = country.subregion.toLowerCase();

  return search(name) || search(countryRegion) || search(subRegion);
};

export const sortData = (countries: CountryData[], sortBy: string) => {
  switch (sortBy) {
    case 'population':
      return countries.sort((a, b) => b.population - a.population);
    case 'area':
      return countries.sort((a, b) => b.area - a.area);
    case 'a-z':
      return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    case 'z-a':
      return countries.sort((a, b) => b.name.common.localeCompare(a.name.common));
    default:
      throw new Error(`Unsupported sortBy value: ${sortBy}`);
  }
};

export const ArrayStringify = (property: { [key: string]: string } | Record<string, string> | undefined) =>
  property && Object.values(property).toString();
