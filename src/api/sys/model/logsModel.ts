import { BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: logs info response
 */
export interface LogsInfo {
  type: string;
  method: string;
  api: string;
  success: boolean;
  reqContent: string;
  respContent: string;
  ip: string;
  userAgent: string;
  operator: string;
  createdAt: string;
  updatedAt: string;
}

// export interface LogsListReq {
//   page: number;
//   pageSize: number;
//   type: string;
//   method: string;
//   field: string;
//   success:boolean;
//   content: string;
//   ip: string;
//   userAgent: string;
//   operator: string;
// }

/**
 *  author: Ryan Su
 *  @description: logs list response
 */

export type LogsListResp = BaseListResp<LogsInfo>;