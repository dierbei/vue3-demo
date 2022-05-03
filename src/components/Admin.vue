<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:openKeys="openKeys">

        <a-sub-menu key="sub1">
          <template #title>
            <span><HomeOutlined />起始页</span>
          </template>
          <a-menu-item key="1"><router-link to="/">后台首页</router-link></a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2">
          <template #title>
            <span><BarChartOutlined />舆情报告</span>
          </template>
          <a-menu-item key="2"><router-link to="/report">全部舆情</router-link></a-menu-item>
          <a-menu-item key="3">正面舆情</a-menu-item>
          <a-menu-item key="4">负面舆情</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub3">
          <template #title>
            <span><SettingOutlined />舆情设置</span>
          </template>
          <a-menu-item key="5"><router-link to="/keywords">舆情关键词设置</router-link></a-menu-item>
          <a-menu-item key="6"><router-link to="/alarm">舆情报警设置</router-link></a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  HomeOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined } from '@ant-design/icons-vue';


export default {
  components: {
    HomeOutlined,
    BarChartOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  data() {
    return {
      openKeys: ["sub1","sub2","sub3"],
      collapsed: false,
    }
  }
}
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>