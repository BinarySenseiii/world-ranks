import axios from 'axios';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const BASE_URL = 'https://restcountries.com/v3.1';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const createInstance = (baseURL: string, options: AxiosRequestConfig = {}) => axios.create({ baseURL, ...options });

export const countryInstance = createInstance(BASE_URL, {});

export const getData = <T>(instance: AxiosInstance, url: string, config: AxiosRequestConfig = {}) =>
  instance.get<T>(url, config).then(responseBody);
