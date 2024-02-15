import { AxiosRequestConfig } from 'axios';

import { countryInstance, getData } from '@/lib/axios-client';

export const getCountryData = <T>(endpoint: string, config: AxiosRequestConfig = {}) =>
  getData<T>(countryInstance, endpoint, config);
