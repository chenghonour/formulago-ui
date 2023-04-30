<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <template v-if="isUpdate" #extra>
      <a-button type="primary" style="margin-right: 8px" @click="handleOpenDetail">
        {{ t('sys.dictionary.keyValue') }}</a-button
      >
    </template>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { DictionaryInfo } from '/@/api/sys/model/dictionaryModel';
  import { createOrUpdateDictionary, createOrAddDictionary } from '/@/api/sys/dictionary';
  // import { useRouter } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'DictionaryDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const go = useGo();
      const dictionaryName = ref<string>('');
      const dictionaryId = ref<number>(0);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          console.log(data.record)
          dictionaryName.value = data.record.name;
          dictionaryId.value = data.record.ID;
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.dictionary.addDictionary') : t('sys.dictionary.editDictionary'),
      );

      function handleOpenDetail() {
        go('/sys/dictionary/detail?id=' + dictionaryId.value + '&name=' + dictionaryName.value);
      }

      async function handleSubmit() {1
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // defined dict id
        let dictId: number;
        if (unref(isUpdate)) {
          dictId = Number(values['ID']);
        } else {
          dictId = 0;
        }
        let params: DictionaryInfo = {
          ID: dictId,
          title: values['title'],
          name: values['name'],
          description: values['description'],
          status: values['status'],
        };
        if (params.ID == 0) {
          const result = await createOrAddDictionary(params, 'message');
          if (result.errCode === 0) {
            closeDrawer();
            emit('success');
          } else {
            setDrawerProps({ confirmLoading: false });
          }
          return;
        }
        let result = await createOrUpdateDictionary(params);
        if (result.errCode === 0) {
          closeDrawer();
          emit('success');
        } else {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        isUpdate,
        handleSubmit,
        t,
        handleOpenDetail,
      };
    },
  });
</script>
