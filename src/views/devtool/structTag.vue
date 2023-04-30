<template>
  <PageWrapper title="输入框内容变化时的触发">
    <Row :gutter="[16, 16]">
      <Col :span="12">
        <div class="mt-1">
          <a-card>
            <a-textarea
              v-model:value="value"
              placeholder="录入内容"
              @change="onSearch"
              :rows="24"
            />
          </a-card>
        </div>
      </Col>
      <Col :span="12">
        <div class="mt-2">
          <a-card>
            <a-textarea
              class="bold"
              v-model:value="protoStr"
              disabled="true"
              placeholder=""
              :rows="24"
            />
            <!-- <MarkdownViewer v-model:value="protoStr" /> -->
          </a-card>
        </div>
      </Col>
    </Row>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { MarkdownViewer } from '/@/components/Markdown';
  import { Card, Row, Col, Spin } from 'ant-design-vue';
  import { Getdeletestructtag } from '/@/api/sys/tool';
  export default defineComponent({
    components: { PageWrapper, Row, Col, Spin, ACard: Card },
    setup() {
      const value = ref<string>('');
      const protoStr = ref<string>('');

      function onSearch() {
        let params: UserInfo = {
          structStr: value.value,
        };
        Getdeletestructtag(params, 'message').then((res) => {
          protoStr.value = res.structStr;
        });
      }
      return {
        value,
        protoStr,
        onSearch,
      };
    },
  });
</script>

<style lang="less">
  .bold {
    font-weight: 700;
    color: rgb(19, 18, 18) !important;
  }
</style>
