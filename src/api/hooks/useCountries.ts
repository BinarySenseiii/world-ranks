import { useQuery } from '@tanstack/react-query';

import { CountryData } from '../_types';
import { getCountryData } from '../config';
import { COUNTRY_CACHE_KEY } from '../query-keys';

export const useCountries = <T>(select?: ((data: CountryData[]) => any) | undefined) => {
  return useQuery<CountryData[], Error, T>({
    queryKey: [COUNTRY_CACHE_KEY],
    queryFn: () => getCountryData(`/all?fields=name,population,flags,region,area,maps,subregion`),
    ...(select ? { select } : {}),
  });
};
