import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { RoleInfo, RoleListResp } from './model/roleModel';

enum Api {
  GetRoleList = '/api/admin/role/list',
  CreateOrAddRole = '/api/admin/role/create',
  CreateOrUpdateRole = '/api/admin/role/update',
  DeleteRole = '/api/admin/role',
  SetRoleStatus = '/api/admin/role/status',
}

/**
 * @description: Get user menu based on role id
 */

export const getRoleList = (params: BasePageReq) => {
  return defHttp.get<BaseDataResp<RoleListResp>>({ url: Api.GetRoleList, params });
};

/**
 *  author: ryan
 *  @description: create a new role
 */
export const createOrAddRole = (params: RoleInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddRole, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: ryan
 *  @description: create a new role
 */
export const createOrUpdateRole = (params: RoleInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateRole, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a role
 */
export const deleteRole = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.delete<BaseResp>(
    { url: Api.DeleteRole, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setRoleStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetRoleStatus, params: { id, status } });
