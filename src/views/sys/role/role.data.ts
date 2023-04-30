import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/sys/role';
import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n';
import { MenuListItem } from '/@/api/sys/model/menuModel';
import { DataNode } from 'ant-design-vue/lib/tree';
import { ApiInfo } from '/@/api/sys/model/apiModel';
import { ApiAuthorityInfo } from '/@/api/sys/model/authorityModel';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.role.roleName'),
    dataIndex: 'name',
    width: 220,
  },
  {
    title: t('sys.role.roleValue'),
    dataIndex: 'value',
    width: 220,
  },
  {
    title: t('common.order'),
    dataIndex: 'orderNo',
    width: 80,
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 220,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setRoleStatus(record.ID, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(t('common.updateSuccess'));
            })
            .catch(() => {
              createMessage.error(t('common.updateFailed'));
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 220,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: t('common.remark'),
    width: 220,
    dataIndex: 'remark',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('sys.role.roleName'),
    required: true,
    component: 'Input',
    rules: [{ max: 20 }],
  },
  {
    field: 'orderNo',
    label: t('sys.menu.order'),
    defaultValue: 0,
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 1000 }],
  },
  {
    field: 'value',
    label: t('sys.role.roleValue'),
    required: true,
    component: 'Input',
    rules: [{ min: 1, max: 10 }],
  },
  {
    field: 'defaultRouter',
    label: t('sys.role.defaultRouter'),
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'status',
    label: t('common.statusName'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 0 },
      ],
    },
  },
  {
    label: t('common.remark'),
    field: 'remark',
    component: 'InputTextArea',
    rules: [{ max: 200 }],
  },
];

/**
 *  author: Ryan Su
 *  @description: this function is used to convert menu data into tree node data
 */

export function convertMenuTreeData(params: MenuListItem[] | undefined): DataNode[] {
  if (params === undefined) {
    return [];
  }
  const data: DataNode[] = [];
  for (const key in params) {
    const tmp: DataNode = {
      title: t(params[key].name),
      key: params[key].ID,
      children: [],
    };
    // console.log(tmp.key);
    if (params[key].children !== undefined) {
      tmp.children = convertMenuTreeData(params[key].children);
    }
    data.push(tmp);
  }
  return data;
}

/**
 *  author: Ryan Su
 *  @description: this function is used to convert menu data into tree node data
 */

export function convertApiTreeData(params: ApiInfo[]): DataNode[] {
  const apiData: DataNode[] = [];
  if (params.length === 0) {
    return apiData;
  }

  const apiMap = new Map<string, boolean>();
  for (let i = 0; i < params.length; i++) {
    apiMap.set(params[i].group, true);
  }

  for (const k of apiMap.keys()) {
    const apiTmp: DataNode = {
      title: k,
      key: k,
      children: [],
    };

    for (let i = 0; i < params.length; i++) {
      if (params[i].group == k) {
        apiTmp.children?.push({
          title: t(params[i].description),
          key: params[i].ID,
        });
      }
    }

    apiData.push(apiTmp);
  }
  return apiData;
}

/**
 *  author: Ryan Su
 *  @description: convert checked data into authorized data
 */
export function convertApiCheckedKeysToReq(checked: number[], data: ApiInfo[]): ApiAuthorityInfo[] {
  // delete string keys
  const pureDigit: number[] = [];
  for (let i = 0; i < checked.length; i++) {
    if (typeof checked[i] === 'number') {
      pureDigit.push(checked[i]);
    }
  }
  // sort data
  data.sort(function (a, b) {
    return a.ID - b.ID;
  });
  pureDigit.sort(function (a, b) {
    return a - b;
  });
  // convert data
  const target: ApiAuthorityInfo[] = [];
  let j = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID === pureDigit[j]) {
      target.push({
        path: data[i].path,
        method: data[i].method,
      });
      j++;
    }
  }
  return target;
}

/**
 *  author: Ryan Su
 *  @description: this function is used to convert authorization api response into checked keys
 */

export function convertApiToCheckedKeys(checked: ApiAuthorityInfo[], data: ApiInfo[]): number[] {
  const dataMap = new Map();
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    dataMap.set(data[i].path + data[i].method, data[i].ID);
  }
  for (let i = 0; i < checked.length; i++) {
    result.push(dataMap.get(checked[i].path + checked[i].method));
  }
  return result;
}
