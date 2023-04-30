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
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './oauth.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { ProviderInfo } from '/@/api/sys/model/oauthModel';
  import { createOrUpdateProvider,CreateOrAddProvider } from '/@/api/sys/oauth';

  export default defineComponent({
    name: 'OauthDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();

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
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.apis.addApi') : t('sys.apis.editApi'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // defined provider id
        let providerId: number;
        if (unref(isUpdate)) {
          providerId = Number(values['id']);
        } else {
          providerId = 0;
        }
        let params: ProviderInfo = {
          id: providerId,
          name: values['name'],
          clientID: values['clientID'],
          clientSecret: values['clientSecret'],
          redirectUrl: values['redirectUrl'],
          scopes: values['scopes'],
          authUrl: values['authUrl'],
          tokenUrl: values['tokenUrl'],
          infoUrl: values['infoUrl'],
          authStyle: values['authStyle'],
          createdAt: 0, // do not need to set
        };
        if(params.id == 0){
           let result = await CreateOrAddProvider(params, 'message');
        if (result.errCode === 0) {
          closeDrawer();
          emit('success');
        } else {
          setDrawerProps({ confirmLoading: false });
        }
        return
        }
        let result = await createOrUpdateProvider(params, 'message');
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
        handleSubmit,
      };
    },
  });
</script>
