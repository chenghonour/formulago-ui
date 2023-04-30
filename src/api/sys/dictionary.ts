import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import {
  DictionaryDetailInfo,
  DictionaryDetailListResp,
  DictionaryInfo,
  DictionaryListResp,
} from './model/dictionaryModel';

enum Api {
  GetDictionaryList = '/api/admin/dict/list',
  CreateOrAddDictionary = '/api/admin/dict/create',
  CreateOrUpdateDictionary = '/api/admin/dict/update',
  DeleteDictionary = '/api/admin/dict',
  GetDictionaryDetailList = '/api/admin/dict/detail/list',
  CreateOrAddDetailDictionary = '/api/admin/dict/detail/create',
  CreateOrUpdateDictionaryDetail = '/api/admin/dict/detail/update',
  DeleteDictionaryDetail = '/api/admin/dict/detail',
}

/**
 * @description: Get dictionary list
 */

export const getDictionaryList = (params: BasePageReq) => {
  return defHttp.get<BaseDataResp<DictionaryListResp>>({ url: Api.GetDictionaryList, params });
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const createOrAddDictionary = (
  params: DictionaryInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const CreateOrAddDetailDictionary = (
  params: DictionaryInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddDetailDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const createOrUpdateDictionary = (
  params: DictionaryInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary
 */
export const deleteDictionary = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 * @description: Get dictionary detail list
 */

export const getDictionaryDetailList = (params: BasePageReq) => {
  return defHttp.get<BaseDataResp<DictionaryDetailListResp>>({
    url: Api.GetDictionaryDetailList,
    params,
  });
};

/**
 *  author: ryan
 *  @description: create a new dictionary detail
 */
export const createOrUpdateDictionaryDetail = (
  params: DictionaryDetailInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary detail
 */
export const deleteDictionaryDetail = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
