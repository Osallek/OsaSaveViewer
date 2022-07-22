import { endpoints } from 'api/index';
import axios, { AxiosPromise } from 'axios';
import * as ENV from 'env/env';
import { Save } from 'types/api.types';

const apiWs = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 600000,
  maxRedirects: 0,
});

const dataWs = axios.create({
  baseURL: ENV.DATA_BASE_URL,
  timeout: 600000,
  maxRedirects: 0,
});

const api = {
  user: {
    one: (id: string): AxiosPromise<Array<any>> => apiWs.get(endpoints.user.one(id))
  },
  save: {
    one: (id: string): AxiosPromise<Save> => dataWs.get(endpoints.save.one(id)),
  },
};

export default api;
