<template>
  <div class="Home">
    <el-button type="info" @click="logout">退出</el-button>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


@Component

export default class Home extends Vue {
  private logout() {
    window.sessionStorage.clear();
    this.$router.push('/');
  }
}
</script>

<style lang="less" ref="stylesheet/less" scoped>
</style>