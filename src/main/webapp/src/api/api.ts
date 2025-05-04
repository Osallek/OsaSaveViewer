import { endpoints } from 'api/index';
import axios, { AxiosPromise } from 'axios';
import { env } from 'env/env';
import * as ENV from 'env/env';
import { Save, ServerSave, UserInfo, Wiki } from 'types/api.types';
import { getWikiDataUrl } from 'utils/data.utils';

const apiWs = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 600000,
  maxRedirects: 0,
  withCredentials: true,
});

const dataWs = axios.create({
  baseURL: env.VITE_DATA_BASE_URL,
  timeout: 600000,
  maxRedirects: 0,
});

const wikiWs = axios.create({
  baseURL: env.VITE_WIKI_BASE_URL,
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
    versions: (): AxiosPromise<Record<string, string>> => apiWs.get(endpoints.wiki.versions),
    data: (version: string, id: string): AxiosPromise<Wiki> => wikiWs.get(endpoints.wiki.data(version, id)),
  },
};

export default api;
