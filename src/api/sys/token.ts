import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BaseIdsReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { TokenInfo, TokenListResp } from './model/tokenModel ';

enum Api {
  GetTokenList = '/api/admin/token/list',
  CreateOrUpdateToken = '/api/admin/token/update',
  DeleteToken = '/api/admin/token',
  BatchDeleteToken = '/token/batch_delete',
  SetTokenStatus = '/token/status',
  Logout = '/api/logout',
}

/**
 * @description: Get token list
 */

export const getTokenList = (params: BasePageReq) => {
  return defHttp.get<BaseDataResp<TokenListResp>>({ url: Api.GetTokenList, params });
};

/**
 *  author: ryan
 *  @description: create or update a new token
 */
export const createOrUpdateApi = (params: TokenInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a token
 */
export const deleteToken = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.DeleteToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: batch delete tokens
 */
export const batchDeleteToken = (params: BaseIdsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeleteToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set the token status
 */
export const setTokenStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetTokenStatus, params: { id, status } });

/**
 *  author: Ryan Su
 *  @description: Force logging out
 */

export const logout = (uuid: string) => defHttp.post({ url: Api.Logout, params: { UUID: uuid } });
