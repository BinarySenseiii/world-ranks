import axios from 'axios';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const createInstance = (baseURL: string, options: AxiosRequestConfig = {}) => axios.create({ baseURL, ...options });

export const countryInstance = createInstance('https://restcountries.com/v3.1', {});

export const getData = <T>(instance: AxiosInstance, url: string, config: AxiosRequestConfig = {}) =>
  instance.get<T>(url, config).then(responseBody);
