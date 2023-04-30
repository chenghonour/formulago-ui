import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('common.name'),
    dataIndex: 'name',
    width: 50,
  },
  {
    title: t('sys.oauth.clientId'),
    dataIndex: 'clientID',
    width: 50,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('common.name'),
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'clientID',
    label: t('sys.oauth.clientId'),
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'clientSecret',
    label: t('sys.oauth.clientSecret'),
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'redirectUrl',
    label: t('sys.oauth.redirectURL'),
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'scopes',
    label: t('sys.oauth.scope'),
    required: true,
    component: 'Input',
    rules: [{ max: 300 }],
  },
  {
    field: 'authUrl',
    label: t('sys.oauth.authURL'),
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'tokenUrl',
    label: t('sys.oauth.tokenURL'),
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'infoUrl',
    label: t('sys.oauth.infoURL'),
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'authStyle',
    label: t('sys.oauth.authStyle'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: t('sys.oauth.params'), value: 1 },
        { label: t('sys.oauth.header'), value: 2 },
      ],
    },
  },
];
