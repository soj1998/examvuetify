<template>
  <div>
    <v-breadcrumbs
      :items="items"
      divider="-"
    ></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbsNav',
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2'
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
</style>
