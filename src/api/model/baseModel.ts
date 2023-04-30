export interface BasePageReq {
  page: number;
  pageSize: number;
}

export interface BaseListResp<T> {
  data: T[];
  total: number;
}

export interface BaseDataResp<T> {
  errCode: number;
  errMsg: string;
  total: number;
  data: T;
}

export interface BaseResp{
  errCode?: number;
  errMsg: string;
}

export interface BaseRespStr<T> {
  errCode?: number;
  errMsg: string;
  protoStr : T;
  structStr: T;
}

export interface BaseIdReq {
  ID: number;
}

export interface BaseIdsReq {
  ids: number[];
}
