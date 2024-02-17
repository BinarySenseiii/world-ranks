import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '@/lib/axios-client';
import { CountryData } from '../_types';
import { getCountryData } from '../config';
import { COUNTRY_CACHE_KEY } from '../query-keys';

export const useCountries = (select?: ((data: CountryData[]) => any) | undefined) => {
  return useQuery<CountryData[], Error>({
    queryKey: [COUNTRY_CACHE_KEY],
    queryFn: () =>
      getCountryData<CountryData[]>(`/all?fields=name,population,flags,independent,region,area,maps,subregion,cca3`),
    ...(select ? { select } : {}),
  });
};

export const getCountry = async (name: string): Promise<CountryData[]> => {
  const res = await fetch(`${BASE_URL}/name/${name}?fullText=true`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data as CountryData[];
};
