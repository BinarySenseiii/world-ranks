import { useQuery } from '@tanstack/react-query';

import { CountryData } from '../_types';
import { getCountryData } from '../config';
import { COUNTRY_CACHE_KEY } from '../query-keys';

export const useCountries = () => {
  return useQuery({
    queryKey: [COUNTRY_CACHE_KEY],
    queryFn: () => getCountryData<CountryData[]>('/all?fields=name,population,flags,region,area'),
  });
};
