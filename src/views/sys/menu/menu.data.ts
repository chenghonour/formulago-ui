import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();
// interface compOption {
//   label: string;
//   value: string | number;
// }

// export const roleOptionData = (menuInfoInStore: any, type: number): compOption[] => {
//   const result: compOption[] = [];
//   // type 1 means search schema

//   for (let i = 0; i < menuInfoInStore.length; i++) {
//     result.push({
//       label: menuInfoInStore[i].name,
//       value: menuInfoInStore[i].parentID,
//     });
//   }
//   return result;
// };

export const extraParamColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.paramType'),
    dataIndex: 'dataType',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.paramKey'),
    dataIndex: 'key',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.paramValue'),
    dataIndex: 'value',
    width: 200,
    align: 'left',
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 200,
    align: 'left',
  },
];

export interface paramFormData {
  id: number;
  menuId: number;
  dataType: string;
  key: string;
  value: string;
}

export const columns: BasicColumn[] = [
  {
    title: t('sys.menu.menuName'),
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.icon'),
    dataIndex: 'meta.icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.meta.icon });
    },
  },
  {
    title: t('sys.menu.component'),
    dataIndex: 'component',
    width: 200,
  },
  {
    title: t('sys.menu.order'),
    dataIndex: 'orderNo',
    width: 80,
  },
  {
    title: t('sys.menu.statusName'),
    dataIndex: 'disabled',
    width: 80,
    customRender: ({ record }) => {
      const status = record.disabled;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.on') : t('common.off');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('sys.menu.isHidden'),
    dataIndex: 'meta.hideMenu',
    width: 80,
    customRender: ({ record }) => {
      const status = record.meta.hideMenu;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.yes') : t('common.no');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

const isDir = (menuType: Number) => menuType === 0;
const isMenu = (menuType: Number) => menuType === 1;
const isButton = (menuType: Number) => menuType === 2;

export const formSchema: FormSchema[] = [
  {
    field: 'menuType',
    label: t('sys.menu.type'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('sys.menu.directory'), value: 0 },
        { label: t('sys.menu.menu'), value: 1 },
        { label: t('sys.menu.button'), value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('sys.menu.menuName'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'parentID',
    label: t('sys.menu.menuParent'),
    component: 'TreeSelect',
    required: true,
    componentProps: {
      // set the field name of the data from the server, the below show that
      // the label show the field of data.name
      fieldNames: {
        label: 'name',
        key: 'ID',
        value: 'ID',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'meta.title',
    label: t('sys.menu.menuTitle'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
    ifShow: ({ values }) => !isButton(values.menuType),
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
    field: 'meta.icon',
    label: t('sys.menu.icon'),
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'path',
    label: t('sys.menu.routePath'),
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.menuType),
    rules: [{ max: 200 }],
  },
  {
    field: 'component',
    label: t('sys.menu.componentPath'),
    component: 'Input',
    required: true,
    rules: [{ max: 100 }],
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'redirect',
    label: t('sys.menu.redirectPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 100 }],
  },
  {
    field: 'frameSrc',
    label: t('sys.menu.frameSrc'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 100 }],
  },
  {
    field: 'dynamicLevel',
    label: t('sys.menu.dynamicLevel'),
    defaultValue: 20,
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 30 }],
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'realPath',
    label: t('sys.menu.realPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 200 }],
  },
  {
    field: 'currentActiveMenu',
    label: t('sys.menu.currentActiveMenu'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 50 }],
  },
  {
    field: 'disabled',
    label: t('sys.menu.statusName'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.on'), value: false },
        { label: t('common.off'), value: true },
      ],
    },
  },
  {
    field: 'isExt',
    label: t('sys.menu.isHttpPath'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'ignoreKeepAlive',
    label: t('sys.menu.isKeepAlive'),
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'meta.hideMenu',
    label: t('sys.menu.isHidden'),
    component: 'RadioButtonGroup',
    // defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'hideBreadcrumb',
    label: t('sys.menu.isBreadcrumbShown'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: false },
        { label: t('common.no'), value: true },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'hideTab',
    label: t('sys.menu.hideTab'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'carryParam',
    label: t('sys.menu.carryParam'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'hideChildrenInMenu',
    label: t('sys.menu.hideChildrenInMenu'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'affix',
    label: t('sys.menu.affix'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'hideTab',
    label: t('sys.menu.hideTab'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
];
