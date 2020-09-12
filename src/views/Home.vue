<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img :src="logo" alt="logo" width="50px" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_btn" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          class="el-menu-vertical-demo"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="$route.path"
        >
          <el-submenu :index="String(index)" v-for="(item, index) in menusList" :key="index">
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.icon"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/home/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const homeStore = namespace("home");

@Component
export default class Home extends Vue {
  // 左侧菜单数据
  @homeStore.State((state) => state.menus) stateMenu: any;
  @homeStore.Action("getMenus") getMenus: any;

  private logo = require("../assets/logo.png");
  // 字体图标对象
  private icons = [
    "iconfont icon-user",
    "iconfont icon-tijikongjian",
    "iconfont icon-shangpin",
    "iconfont icon-danju",
    "iconfont icon-baobiao",
  ];
  private isCollapse = false;

  private mounted() {
    this.getMenus();
  }

  // 重写菜单列表
  get menusList() {
    this.stateMenu.map((item: any, index: number) => {
      item.icon = this.icons[index];
    });
    return this.stateMenu;
  }

  // 登出事件
  private logout() {
    window.sessionStorage.clear();
    this.$router.push("/");
  }

  // 切换菜单折叠事件
  private toggleCollapse() {
    this.isCollapse = !this.isCollapse;
  }
}
</script>

<style lang="less" ref="stylesheet/less" scoped>
.el-container {
  height: 100%;
}

.toggle_btn {
  background-color: #4a5064;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  font-size: 10px;
  letter-spacing: .2em;
  cursor: pointer;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-menu {
  border-right: none;
}

.el-aside {
  height: 100%;
  overflow-y: scroll;
  background-color: #333744;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-submenu {
  .iconfont {
    font-size: 20px;
    padding-right: 5px;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>