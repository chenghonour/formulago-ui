<template>
  <PageWrapper :title="t('sys.init.initTitle')">
    <ACard :title="t('sys.init.initCoreDatabase')" :bordered="false" style="width: 50%">
      <!-- <ASpin v-if="showSpin" :indicator="indicator" /> -->
      <a-button type="primary" :loading="coreInitButtonLoading" @click="initCoreDatabase">
        {{ t('common.start') }}
      </a-button>
    </ACard>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Card, message } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  // api
  import { initialzeCoreDatabase } from '/@/api/sys/initialize';
  import { initializeFileDatabase } from '/@/api/file/initialize';

  const { t } = useI18n();
  const ACard = Card;
  const coreInitButtonLoading = ref<boolean>(false);
  const fileInitButtonLoading = ref<boolean>(false);

  async function initCoreDatabase() {
    coreInitButtonLoading.value = true;
    const result = await initialzeCoreDatabase();
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
    coreInitButtonLoading.value = false;
  }

  async function initFileDatabase() {
    fileInitButtonLoading.value = true;
    const result = await initializeFileDatabase();
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
    fileInitButtonLoading.value = false;
  }
</script>
