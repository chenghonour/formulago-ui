import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {  BaseIdReq,  BasePageReq,  BaseResp,BaseDataResp } from '/@/api/model/baseModel';
import {  LogsListResp, } from './model/logsModel';

enum Api {
  GetLogsList = '/api/admin/logs/list',
  DeleteLogs = '/api/admin/logs/deleteAll',
}

/**
 * @description: Get logs list
 */

export const getLogsList = (params: BasePageReq) => {
  return defHttp.get<BaseDataResp<LogsListResp>>({ url: Api.GetLogsList, params });
};





/**
 *  author: Ryan Su
 *  @description: delete logs
 */
export const deleteLogs = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.DeleteLogs, params: params },
    {
      errorMessageMode: mode,
    },
  );
};