import { endpoints } from 'api/index';
import axios, { AxiosPromise } from 'axios';
import * as ENV from 'env/env';
import { Decision, Save, ServerSave, UserInfo } from 'types/api.types';
import { getDecisions } from 'utils/data.utils';

const apiWs = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 600000,
  maxRedirects: 0,
  withCredentials: true,
});

const dataWs = axios.create({
  baseURL: ENV.DATA_BASE_URL,
  timeout: 600000,
  maxRedirects: 0,
});

const wikiWs = axios.create({
  baseURL: ENV.WIKI_BASE_URL,
  timeout: 600000,
  maxRedirects: 0,
});

const api = {
  user: {
    one: (id: string): AxiosPromise<UserInfo> => dataWs.get(endpoints.user.one(id)),
    profile: (): AxiosPromise<UserInfo> => apiWs.get(endpoints.user.profile),
  },
  save: {
    one: (id: string): AxiosPromise<Save> => dataWs.get(endpoints.save.one(id)),
    delete: (id: string): AxiosPromise<VoidFunction> => apiWs.delete(endpoints.save.delete(id)),
    recent: (): AxiosPromise<Array<ServerSave>> => apiWs.get(endpoints.save.recent),
  },
  steam: {
    logout: (): AxiosPromise<VoidFunction> => apiWs.post(endpoints.steam.logout),
  },
  wiki: {
    decisions: (version: string): AxiosPromise<Record<string, Decision>> => wikiWs.get(getDecisions(version)),
  },
};

export default api;
