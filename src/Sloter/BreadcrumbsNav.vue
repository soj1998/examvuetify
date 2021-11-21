<template>
  <div>
    <v-breadcrumbs :items="items" large>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbsNav',
  data: () => ({
    items: [
      {
        text: '首页',
        disabled: false,
        href: '/houtai/#/sy1'
      },
      {
        text: '当前页',
        disabled: true,
        href: 'breadcrumbs_link_1'
      }
    ]
  })
}
</script>

<style scoped>
  .el-footer {
    color: #333;
    text-align: center;
    font-size: large;
    line-height: 20px;
  }
  .something {
    color: var(--v-primary-base);
    background-color: #E0F7FA;
    font-family :"FangSong",Georgia,Serif!important;
    font-size: 24px;
  }
</style>
