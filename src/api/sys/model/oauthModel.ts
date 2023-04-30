import { BaseDataResp, BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: provider info response
 */
export interface ProviderInfo {
  id: number;
  createdAt?: number;
  updatedAt?: number;
  name: string;
  clientID: string;
  clientSecret: string;
  redirectUrl: string;
  scopes: string;
  authUrl: string;
  tokenUrl: string;
  authStyle: string;
  infoUrl: string;
}

/**
 *  author: Ryan Su
 *  @description: provider list response
 */

export type ProviderListResp = BaseListResp<ProviderInfo>;

/**
 *  author: Ryan Su
 *  @description: Oauth log in request parameters
 */
export interface OauthLoginReq {
  state: string;
  provider: string;
}

/**
 *  author: Ryan Su
 *  @description: redirect response
 */
export type RedirectResp = BaseDataResp<RedirectInfo>;

/**
 *  author: Ryan Su
 *  @description: redirect information
 */
export interface RedirectInfo {
  URL: string;
}
