import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
// import { useMessage } from '/@/hooks/web/useMessage';

const { t } = useI18n();


export const columns: BasicColumn[] = [
  {
    title: t('sys.logs.type'),
    dataIndex: 'type',
    width: 60,
  },
  {
    title: t('sys.logs.method'),
    dataIndex: 'method',
    width: 80,
  },
  {
    title: t('sys.logs.api'),
    dataIndex: 'api',
    width: 80,
  },
  {
    title: t('sys.logs.success'),
    dataIndex: 'success',
    width: 60,
    customRender: ({ record }) => {
      const status = record.success;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.success') : t('common.fail');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('sys.logs.ip'),
    dataIndex: 'ip',
    width: 80,
  },
  {
    title: t('sys.logs.reqContent'),
    dataIndex: 'reqContent',
    width: 80,
    ellipsis: true,
  },
  {
    title: t('sys.logs.respContent'),
    dataIndex: 'respContent',
    width: 80,
    ellipsis: true,
  },
  {
    title: t('sys.logs.userAgent'),
    dataIndex: 'userAgent',
    width: 80,
    ellipsis: true,
  },
  {
    title: t('sys.logs.operator'),
    dataIndex: 'operator',
    width: 50,
  },
  {
    title: t('sys.logs.time'),
    dataIndex: 'time',
    width: 40,
  },
  {
    title: t('sys.logs.createdAt'),
    dataIndex: 'createdAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: t('sys.logs.updatedAt'),
    dataIndex: 'updatedAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.updatedAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: t('sys.logs.type'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'success',
    label: t('sys.logs.success'),
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: t('sys.logs.successLo'), value: true },
        { label: t('sys.logs.errorLo'), value: false },
      ],
    },
  },
  {
    field: 'method',
    label: t('sys.logs.method'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },

  {
    field: 'api',
    label: t('sys.logs.api'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'content',
    label: t('sys.logs.content'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'ip',
    label: t('sys.logs.ip'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'userAgent',
    label: t('sys.logs.userAgent'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'operator',
    label: t('sys.logs.operator'),
    component: 'Input',
    colProps: { span: 8 },
  },
];