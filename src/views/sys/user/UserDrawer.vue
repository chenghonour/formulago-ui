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
  import { formSchema, roleOptionData } from './user.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { UserInfo } from '/@/api/sys/model/userModel';
  import { createOrUpdateUser, createOrAddUser } from '/@/api/sys/user';
  import { getRoleList } from '/@/api/sys/role';

  export default defineComponent({
    name: 'UserDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
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

        const roleData = await getRoleList({
          page: 1,
          pageSize: 1000,
        });
        // 更新抽屉的角色模式
        updateSchema({
          field: 'roleID',
          componentProps: {
            options: roleOptionData(roleData.data, 0),
          },
        });
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.user.addUser') : t('sys.user.editUser'),
      );

      async function handleSubmit() {
        const values = await validate();
        console.log(values)
        setDrawerProps({ confirmLoading: true });
        // defined user id
        let userId: number;
        let password: string;
        if (unref(isUpdate)) {
          userId = Number(values['ID']);
          if (values['password'] == undefined) {
            password = '';
          } else {
            password = values['password'];
          }
        } else {
          userId = 0;
        }
        let params: UserInfo = {
          ID: userId,
          username: values['username'],
          nickname: values['nickname'],
          mobile: values['mobile'],
          email: values['email'],
          status: values['status'],
          roleID: values['roleID'],
          avatar: values['avatar'],
          password: password,
          createdAt: 0, // do not need to set
          updatedAt: 0, // do not need to set
        };

        if (params.ID == 0) {
          const result = await createOrAddUser(params, 'message');
          if (result.errCode === 0) {
            closeDrawer();
            emit('success');
          } else {
            setDrawerProps({ confirmLoading: false });
          }
          return;
        }
        const result = await createOrUpdateUser(params, 'message');
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
        handleSubmit,
        getTitle,
      };
    },
  });
</script>
