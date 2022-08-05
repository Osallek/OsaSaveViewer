import * as ENV from 'env/env';

export function getRedirectUrl(): string {
  return `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.ns.sreg=http://openid.net/extensions/sreg/1.1&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.realm=${ ENV.BASE_URL }&openid.return_to=${ ENV.API_BASE_URL }/steam/login`;
}

export const STORAGE_NAME = 'user';
