import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {  BaseRespStr } from '/@/api/model/baseModel';
import { ToolListResp,ToolInfo  } from './model/toolModel ';

enum Api {
  GetStructToProto = '/api/structToProto',
  GetDeleteStructTag = '/api/deleteStructTag',

}

// /**
//  * @description: Get StructToProto 
//  */

// export const getStructToProto = (params :BasePageReq) => {
//   return defHttp.post<BaseResp<ToolListResp>>({ url: Api.GetStructToProto, params });
// };

/**
 *  author: Czx
 *  @description: 转换struct至proto类型数据r
 */
export const getStructToProto = (params: ToolInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseRespStr<ToolListResp>>(
    { url: Api.GetStructToProto, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Czx
 *  @description: 去掉struct tag
 */
export const Getdeletestructtag = (params: ToolInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseRespStr<ToolListResp>>(
    { url: Api.GetDeleteStructTag, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

// /**
//  *  author: ryan
//  *  @description: create or update a new token
//  */
// export const createOrUpdateApi = (params: TokenInfo, mode: ErrorMessageMode = 'modal') => {
//   return defHttp.post<BaseResp>(
//     { url: Api.CreateOrUpdateToken, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: delete a token
//  */
// export const deleteToken = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
//   return defHttp.delete<BaseResp>(
//     { url: Api.DeleteToken, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: batch delete tokens
//  */
// export const batchDeleteToken = (params: BaseIdsReq, mode: ErrorMessageMode = 'modal') => {
//   return defHttp.post<BaseResp>(
//     { url: Api.BatchDeleteToken, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: set the token status
//  */
// export const setTokenStatus = (id: number, status: number) =>
//   defHttp.post({ url: Api.SetTokenStatus, params: { id, status } });

// /**
//  *  author: Ryan Su
//  *  @description: Force logging out
//  */

// export const logout = (uuid: string) => defHttp.post({ url: Api.Logout, params: { UUID: uuid } });
