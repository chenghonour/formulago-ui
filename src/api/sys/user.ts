import { defHttp } from '/@/utils/http/axios';
import {
  LoginReq,
  LoginResp,
  GetUserInfoModel,
  CaptchaResp,
  RegisterReq,
  UserListReq,
  UserListResp,
  UserInfo,
  UserProfile,
  ChangePasswordReq,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BaseResp } from '../model/baseModel';

enum Api {
  Login = '/api/login',
  Register = '/api/user/register',
  Logout = '/api/admin/token',
  GetUserInfo = '/api/admin/user/info',
  GetPermCode = '/api/admin/user/perm',
  GetCaptcha = '/api/captcha',
  GetUserList = '/api/admin/user/list',
  CreateOrAddUser = '/api/admin/user/create',
  CreateOrUpdateUser = '/api/admin/user/update',
  DeleteUser = '/api/admin/user',
  SetUserStatus = '/api/admin/user/status',
  GetProfile = '/api/admin/user/profile',
  ChangePassword = '/api/admin/user/change-password',
}

/**
 * @description: user login api
 */
export function login(params: LoginReq, mode: ErrorMessageMode = 'message') {
  return defHttp.post<BaseDataResp<LoginResp>>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user register api
 */
export function register(params: RegisterReq, mode: ErrorMessageMode = 'message') {
  return defHttp.post<BaseResp>(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get captcha api
 */
export function getCaptcha(mode: ErrorMessageMode = 'message') {
  return defHttp.get<BaseDataResp<CaptchaResp>>(
    {
      url: Api.GetCaptcha,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<BaseDataResp<GetUserInfoModel>>(
    { url: Api.GetUserInfo },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<BaseDataResp<string[]>>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.delete({ url: Api.Logout });
}

// user management

/**
 * @description: Get user menu based on api id
 */

export const getUserList = (params: UserListReq) => {
  return defHttp.get<BaseDataResp<UserListResp>>({ url: Api.GetUserList, params });
};

/**
 *  author: Ryan Su
 *  @description: create a new user
 */
export const createOrAddUser = (params: UserInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: create a new user
 */
export const createOrUpdateUser = (params: UserInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a user
 */
export const deleteUser = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.delete<BaseResp>(
    { url: Api.DeleteUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setUserStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetUserStatus, params: { id, status } });

/**
 *  author: Ryan Su
 *  @description: Get user profile
 */
export function getUserProfile() {
  return defHttp.get<BaseDataResp<UserProfile>>(
    { url: Api.GetProfile },
    { errorMessageMode: 'message' },
  );
}

/**
 *  author: Ryan Su
 *  @description: update user profile
 */
export function updateProfile(params: UserProfile) {
  return defHttp.post<BaseResp>({ url: Api.GetProfile, params }, { errorMessageMode: 'message' });
}

/**
 *  author: Ryan Su
 *  @description: change user password
 */
export function changePassword(params: ChangePasswordReq) {
  return defHttp.post<BaseResp>(
    { url: Api.ChangePassword, params },
    { errorMessageMode: 'message' },
  );
}
