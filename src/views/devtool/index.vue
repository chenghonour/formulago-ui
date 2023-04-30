<template>
  <PageWrapper title="MarkDown组件嵌入Form示例">
    <CollapseContainer title="MarkDown表单">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :baseColProps="{ span: 24 }"
        @submit="handleSubmit"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { BasicForm, FormSchema } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { MarkDown } from '/@/components/Markdown';
  import { PageWrapper } from '/@/components/Page';
  import { getStructToProto } from '/@/api/sys/tool';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: 'title',
      defaultValue: '标题',
      rules: [{ required: true }],
    },
    {
      field: 'markdown',
      component: 'Input',
      label: 'markdown',
      defaultValue: 'defaultValue',
      rules: [{ required: true, trigger: 'blur' }],
      render: ({ model, field }) => {
        return h(MarkDown, {
          value: model[field],
          onChange: (value: string) => {
            console.log('11', value);
            model[field] = value;
          },
        });
      },
    },
  ];
  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const { createMessage } = useMessage();

      return {
        schemas,
        handleSubmit: (values: any) => {
          let params: UserInfo = {
            structStr: values.markdown,
          };
          getStructToProto(params, 'message').then((res) => {
            console.log(res);
            model[field] = res.protoStr;
          });
          // createMessage.success('click search,values:' + JSON.stringify(values));
        },
      };
    },
  });
</script>
