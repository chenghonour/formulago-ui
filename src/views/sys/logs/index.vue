<template>
  <div>
    <BasicTable @register="registerTable">
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('sys.user.addUser') }} </a-button>
      </template> -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: t('common.deleteConfirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  // import { useDrawer } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './logs.data';
  import { getLogsList, deleteLogs } from '/@/api/sys/logs';

  export default defineComponent({
    name: 'LogsManagement',
    components: { BasicTable,  TableAction },
    setup() {
      const { t } = useI18n();
       const [registerTable, { reload }] = useTable({
        title: t('sys.logs.logsList'),
        api: getLogsList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 30,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
      });
      // const [registerDrawer, { openDrawer }] = useDrawer();
      // const [registerTable, { reload }] = useTable({
      //   title: t('sys.logs.logsList'),
      //   api: getLogsList,
      //   columns,
      //   formConfig: {
      //     labelWidth: 120,
      //     schemas: searchFormSchema,
      //   },
      //   useSearchForm: true,
      //   showTableSetting: true,
      //   bordered: true,
      //   showIndexColumn: false,
      //   actionColumn: {
      //     width: 30,
      //     title: t('common.action'),
      //     dataIndex: 'action',
      //     fixed: undefined,
      //   },
      // });

      // function handleCreate() {
      //   openDrawer(true, {
      //     isUpdate: false,
      //   });
      // }

      // function handleEdit(record: Recordable) {
      //   openDrawer(true, {
      //     record,
      //     isUpdate: true,
      //   });
      // }

      async function handleDelete(record: Recordable) {
        const result = await deleteLogs({ id: record.ID }, 'modal');
        if (result.errCode === 0) message.success(result.errMsg);
        
      }



      function handleSuccess() {
        reload();
      }

      return {
        t,
        registerTable,
        // registerDrawer,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>