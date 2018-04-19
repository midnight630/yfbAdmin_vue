<template>
  <div class="index">
    <Top></Top>
  </div>
</template>

<script>
import Top from './top.vue'

export default {
  name: 'index',
  components: {
    Top
  }
}
</script>

<style lang="less" scoped>
  .index{
    padding: 30px;
  }
</style>
