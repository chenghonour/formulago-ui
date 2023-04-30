import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BaseResp } from '/@/api/model/baseModel';
import { ApiListResp } from './model/apiModel';
import {
  ApiAuthorityReq,
  ApiListReq,
  MenuAuthorityInfo,
  ApiAuthorityResp,
} from './model/authorityModel';

enum Api {
  CreateOrUpdateApiAuthority = '/api/admin/authority/api/update',
  CreateOrAddMenuAuthority = '/api/admin/authority/menu/create',
  CreateOrUpdateMenuAuthority = '/api/admin/authority/menu/update',
  GetRoleMenuList = '/api/admin/authority/menu/role',
  
  GetRoleApiList = '/api/admin/authority/api/role',
  GetApiList = '/api/admin/api/list',
}

/**
 *  author: Ryan Su
 *  @description: this function is used to get api list for authorization
 */

export const getApiList = (params: ApiListReq) => {
  return defHttp.get<BaseDataResp<ApiListResp>>({ url: Api.GetApiList, params });
};

/**
 * @description: Get api authorization list
 */

export const getApiAuthority = (params: BaseIdReq) => {
  return defHttp.post<BaseDataResp<ApiAuthorityResp>>({ url: Api.GetRoleApiList, params });
};

/**
 *  author: ryan
 *  @description: create or update api authorization
 */
export const createOrUpdateApiAuthority = (
  params: ApiAuthorityReq,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateApiAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const CreateOrAddMenuAuthority = (
  params: MenuAuthorityInfo,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddMenuAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const createOrUpdateMenuAuthority = (
  params: MenuAuthorityInfo,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateMenuAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: get role's menu authorization ids
 */

export const getMenuAuthority = (params: BaseIdReq) => {
  return defHttp.post<BaseDataResp<MenuAuthorityInfo>>({
    url: Api.GetRoleMenuList,
    params,
  });
};
