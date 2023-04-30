import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { setFileStatus } from '../../api/file/file';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('fileManager.fileName'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('fileManager.fileType'),
    dataIndex: 'fileType',
    width: 30,
    customRender: ({ record }) => {
      if (record.fileType === 'video') {
        return t('fileManager.video');
      } else if (record.fileType === 'audio') {
        return t('fileManager.audio');
      } else if (record.fileType === 'image') {
        return t('fileManager.image');
      } else {
        return t('fileManager.other');
      }
    },
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 40,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('fileManager.public'),
        unCheckedChildren: t('fileManager.private'),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setFileStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(t('common.changeStatusSuccess'));
            })
            .catch(() => {
              createMessage.error(t('common.changeStatusFailed'));
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('fileManager.filePath'),
    dataIndex: 'path',
    width: 200,
  },
  {
    title: t('fileManager.fileSize'),
    dataIndex: 'size',
    width: 50,
    customRender: ({ record }) => {
      if (record.size > 1073741824) {
        return (record.size / 1073741824).toFixed(2) + 'GB';
      } else if (record.size > 1048576) {
        return (record.size / 1048576).toFixed(2) + 'MB';
      } else {
        return (record.size / 1024).toFixed(2) + 'KB';
      }
    },
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
    field: 'fileType',
    label: t('fileManager.fileType'),
    colProps: { span: 8 },
    component: 'Select',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: t('common.all'), value: 0 },
        { label: t('fileManager.other'), value: 1 },
        { label: t('fileManager.image'), value: 2 },
        { label: t('fileManager.video'), value: 3 },
        { label: t('fileManager.audio'), value: 4 },
      ],
    },
  },
  {
    field: 'fileName',
    label: t('fileManager.fileName'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'period',
    label: t('common.createTime'),
    defaultValue: [new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000), new Date()],
    component: 'RangePicker',
    colProps: { span: 8 },
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
    label: t('fileManager.fileName'),
    required: true,
    component: 'Input',
  },
];
