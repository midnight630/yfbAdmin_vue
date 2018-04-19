<template>
  <div class="top">
    <el-row :gutter="20">
    <el-col :span="8">
      <div class="grid-content bg-purple">
        
      </div>
    </el-col>
    <el-col :span="8"><div class="grid-content bg-purple">2</div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">3</div></el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'top'
}
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple {
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2)
  }
  .grid-content {
    border-radius: 4px;
  }
</style>

