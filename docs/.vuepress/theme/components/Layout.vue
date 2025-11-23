<script setup>
import { Layout } from 'vuepress-theme-plume/client'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import AsideNav from './AsideNav.vue'
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <AsideNav />
    </template>
    <template #doc-title-after>
      <PageContextMenu />
    </template>
  </Layout>
</template>

<style>
</style>