import { BaseRespStr } from '../../model/baseModel';


export interface ToolInfo {
  structStr: string;
}



export type ToolListResp = BaseRespStr<ToolInfo>;
