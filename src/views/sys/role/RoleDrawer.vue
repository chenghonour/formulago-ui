<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
    @close="handleCancel"
  >
    <template v-if="isUpdate" #extra>
      <a-button type="primary" style="margin-right: 8px" @click="showChildrenDrawer">
        {{ t('sys.authority.authorityManagement') }}</a-button
      >
    </template>
    <BasicForm @register="registerForm" />
    <BasicDrawer
      v-model:visible="childrenDrawer"
      :title="t('sys.authority.authorityManagement')"
      width="320"
      showFooter
      :closable="true"
      @ok="handleAuthorizationSubmit"
      @close="handleCancel"
    >
      <ATabs v-model:activeKey="activeKey" centered>
        <ATabPane key="1" :tab="t('sys.authority.menuAuthority')">
          <ATree
            v-model:checkedKeys="checkedMenuKeys"
            :onCheck="onCheck"
            checkable
            :height="600"
            :tree-data="treeMenuData"
            checkStrictly= true
            
          />
        </ATabPane>
        <ATabPane key="2" :tab="t('sys.authority.apiAuthority')">
          <ATree
            v-model:checkedKeys="checkedApiKeys"
            checkable
            :height="600"
            :tree-data="treeApiData"
          />
        </ATabPane>
      </ATabs>
    </BasicDrawer>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, watch } from 'vue';
  import { Tabs, Tree, message } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    formSchema,
    convertMenuTreeData,
    convertApiTreeData,
    convertApiCheckedKeysToReq,
    convertApiToCheckedKeys,
  } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { RoleInfo } from '/@/api/sys/model/roleModel';
  import { ApiAuthorityInfo } from '/@/api/sys/model/authorityModel';
  import { createOrUpdateRole, createOrAddRole } from '/@/api/sys/role';
  import { getAllMenu } from '/@/api/sys/menu';
  import {
    createOrUpdateMenuAuthority,
    getMenuAuthority,
    getApiList,
    createOrUpdateApiAuthority,
    getApiAuthority,
    CreateOrAddMenuAuthority,
  } from '/@/api/sys/authority';
  import { DataNode } from 'ant-design-vue/lib/tree';
  import console, { Console } from 'console';
  import { BaseDataResp } from '/@/api/model/baseModel';
  import { ApiListResp } from '/@/api/sys/model/apiModel';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, ATabs: Tabs, ATabPane: Tabs.TabPane, ATree: Tree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const activeKey = ref('1');
      let tempApiList: BaseDataResp<ApiListResp> = {
        errCode: 0,
        errMsg: '',
        data: { total: 0, data: [] },
      };
      // children drawer
      const childrenDrawer = ref<boolean>(false);
      const showChildrenDrawer = () => {
        childrenDrawer.value = true;
      };
      // defined menu items
      const checkedMenuKeys = ref<number[]>([]);
      const treeMenuData = ref<DataNode[]>([]);
      const allCheckedKeys = ref<number[]>([]);
      async function getMenuData() {
        try {
          treeMenuData.value = [];
          const data = await getAllMenu();
          const dataConv = convertMenuTreeData(data.data);
          for (const key in dataConv) {
            treeMenuData.value.push(dataConv[key]);
          }
          const roleId = await validate();
          const checkedData = await getMenuAuthority({ id: Number(roleId['ID']) });
          checkedMenuKeys.value = checkedData.MenuIDs;
        } catch (error) {
          console.log(error);
        }
      }
      // defined api items
      const checkedApiKeys = ref<number[]>([]);
      const treeApiData = ref<DataNode[]>([]);
      async function getApiData() {
        try {
          treeApiData.value = [];
          const apiData = await getApiList({
            page: 1,
            pageSize: 10000,
            path: '',
            group: '',
            method: '',
            description: '',
          });
          tempApiList = apiData;
          const dataConv = convertApiTreeData(apiData.data);
          for (const key in dataConv) {
            treeApiData.value.push(dataConv[key]);
          }
          const roleID = await validate();
          const checkedData = await getApiAuthority({ id: Number(roleID['ID']) });
          const checkKeyConv = convertApiToCheckedKeys(checkedData.data, apiData.data);
          checkedApiKeys.value = checkKeyConv;
        } catch (error) {
          console.log(error);
        }
      }
      // watch the change of children drawer
      watch(childrenDrawer, () => {
        if (childrenDrawer.value == true) {
          getMenuData();
          getApiData();
        }
      });

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
        !unref(isUpdate) ? t('sys.role.addRole') : t('sys.role.editRole'),
      );

      // handler cancel
      function handleCancel() {
        childrenDrawer.value = false;
        closeDrawer();
      }

      //父子节点问题
      function onCheck(checkedKeys, info) {
          allCheckedKeys.value = checkedKeys.checked.concat(info.halfCheckedKeys); //将父节点拼接到子节点
      }

      // 编辑角色修改
      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // defined role id
        let roleId: number;
        if (unref(isUpdate)) {
          roleId = Number(values['ID']);
        } else {
          roleId = 0;
        }
        let params: RoleInfo = {
          ID: roleId,
          // title: '',
          name: values['name'],
          value: values['value'],
          defaultRouter: values['defaultRouter'],
          status: values['status'],
          remark: values['remark'],
          orderNo: values['orderNo'],
          // createdAt: 0, // do not need to set
        };
        if (params.ID == 0) {
          let result = await createOrAddRole(params);
          if (result.code === 1) {
            childrenDrawer.value = false;
            closeDrawer();
            emit('success');
          } else {
            setDrawerProps({ confirmLoading: false });
          }
          return;
        }
        let result = await createOrUpdateRole(params);
        if (result.code === 1) {
          childrenDrawer.value = false;
          closeDrawer();
          emit('success');
        } else {
          setDrawerProps({ confirmLoading: false });
        }
      }

      // 权限管理修改
      async function handleAuthorizationSubmit() {
        if (activeKey.value === '1') {
          const roleData = await validate();
          // if(roleData.ID === 0){
          //     const result = await CreateOrAddMenuAuthority({
          //   roleID: Number(roleData['ID']),
          //   MenuIDs: checkedMenuKeys.value,
          // });
          // message.success(t(result.msg));
          // return
          // }
          checkedMenuKeys.value = allCheckedKeys.value
          const result = await createOrUpdateMenuAuthority({
            roleID: Number(roleData['ID']),
            MenuIDs: checkedMenuKeys.value,
          });
           if (result.errCode === 0) {
            childrenDrawer.value = false;
            message.success(result.errMsg);
            closeDrawer();
          }
        } else {
          const apiReqData: ApiAuthorityInfo[] = convertApiCheckedKeysToReq(
            checkedApiKeys.value,
            tempApiList.data,
          );

          const roleData = await validate();
          const result = await createOrUpdateApiAuthority({
            roleID: Number(roleData['ID']),
            data: apiReqData,
          });
          if (result.errCode === 0) {
            childrenDrawer.value = false;
            message.success(result.errMsg);
            closeDrawer();
          }
        }
      }

      return {
        t,
        isUpdate,
        activeKey,
        showChildrenDrawer,
        childrenDrawer,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        handleCancel,
        handleAuthorizationSubmit,
        checkedMenuKeys,
        treeMenuData,
        checkedApiKeys,
        treeApiData,
        onCheck,
        allCheckedKeys,
      };
    },
  });
</script>
