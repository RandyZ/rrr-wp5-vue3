<template>
  <div class="ant-design-vue-con">
    <h1>日期选择器</h1>
    <a-space direction="vertical">
      <a-date-picker>
        <template #renderExtraFooter>extra footer</template>
      </a-date-picker>
      <a-date-picker show-time>
        <template #renderExtraFooter>extra footer</template>
      </a-date-picker>
      <a-range-picker>
        <template #renderExtraFooter>extra footer</template>
      </a-range-picker>
      <a-range-picker show-time>
        <template #renderExtraFooter>extra footer</template>
      </a-range-picker>
      <a-date-picker placeholder="Select month" picker="month">
        <template #renderExtraFooter>extra footer</template>
      </a-date-picker>
    </a-space>
    <br />
    <br />
    <h1>普通选择器</h1>
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">Large</a-radio-button>
      <a-radio-button value="middle">Middle</a-radio-button>
      <a-radio-button value="small">Small</a-radio-button>
    </a-radio-group>
  </div>
</template>
<script lang="ts">
import { ref, type Ref, defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const showModal = () => {
      // eslint-disable-next-line semi
      visible.value = true;
    }

    const handleOk:(e:Event) => void = e => {
      console.log(e)
      visible.value = false
    }

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    }
    const formState = reactive({
      'input-number': 3,
      'checkbox-group': ['A', 'B'],
      rate: 3.5,
    })

    const onFinish: (values: any) => void = values => {
      console.log('Success:', values)
    }

    const onFinishFailed: (errorInfo: any) => void = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    const popupScroll = () => {
      console.log('popupScroll')
    }

    const sliderValue1 = ref(0)
    const sliderValue2 = ref([20, 50])
    const size: Ref<string | number> = ref('middle')

    return {
      visible,
      showModal,
      handleOk,
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout,
      popupScroll,
      size,
      value1: ref('a1'),
      value2: ref(['a1', 'b2']),
      value3: ref(['a1', 'b2']),
      options: [...Array(25)].map((_, i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),
      sliderValue1,
      sliderValue2,
    }
  },

})
</script>

<style lang="less">
.ant-design-vue-con {
  width: 50vw;
  margin: 0 auto;
  background: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 40vw;
}

#components-popover-demo-triggerType .ant-btn {
  margin-right: 8px;
}

.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
