<template>
  <div>
    <el-footer>
      <slot name="f">要被替换的内容</slot>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .el-footer {
    color: #333;
    text-align: center;
    font-size: large;
    line-height: 20px;
  }
</style>