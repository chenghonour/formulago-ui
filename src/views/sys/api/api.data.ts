import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.apis.path'),
    dataIndex: 'path',
    width: 200,
  },
  {
    title: t('sys.apis.group'),
    dataIndex: 'group',
    width: 50,
  },
  {
    title: t('sys.apis.description'),
    dataIndex: 'description',
    width: 200,
  },
  {
    title: t('sys.apis.method'),
    dataIndex: 'method',
    width: 50,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'path',
    label: t('sys.apis.path'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 100 }],
  },
  {
    field: 'group',
    label: t('sys.apis.group'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 10 }],
  },
  {
    field: 'description',
    label: t('sys.apis.description'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'method',
    label: t('sys.apis.method'),
    component: 'Input',
    colProps: { span: 8 },
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
    field: 'path',
    label: t('sys.apis.path'),
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'group',
    label: t('sys.apis.group'),
    required: true,
    component: 'Input',
    rules: [{ max: 10 }],
  },
  {
    field: 'description',
    label: t('sys.apis.description'),
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'method',
    label: t('sys.apis.method'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PUT', value: 'PUT' },
      ],
    },
  },
];
