<template>
  <div class="report_top">
    <a-date-picker v-model:value="startTime" placeholder="起始日期" />
    -
    <a-date-picker v-model:value="endTime" placeholder="截止日期" />

    <a-button type="primary" class="search_btn" @click="doSearch">搜索</a-button>
  </div>
  <a-table
    :columns="columns"
    :data-source="listData"
    :row-key="(record) => record.id"
    :pagination="pagination"
    :loading="loading"
    @change="changeReportData"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #myType="{ text }">
      <span v-if="text == 1">正面舆情</span>
      <span v-else>负面舆情</span>
    </template>
    <template #myUrl="{ text }">
      <a :href="text" target="_blank" rel="noopener noreferrer">{{ text }}</a>
    </template>

    <template #myAddTime="{ text }">
      {{ formatTime(text) }}
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import { message } from "ant-design-vue";
const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "舆情类型",
    dataIndex: "type",
    key: "type",
    width: 100,
    slots: { customRender: "myType" },
  },
  {
    title: "舆情关键词",
    dataIndex: "keywords",
    key: "keywords",
    width: 160,
  },
  {
    title: "舆情网站",
    dataIndex: "url",
    key: "url",
    width: 160,
    slots: { customRender: "myUrl" },
  },
  {
    title: "发现时间",
    dataIndex: "add_time",
    key: "add_time",
    slots: { customRender: "myAddTime" },
  },
];

const listData: any[] = [];
let userinfo: any;
export default defineComponent({
  name: "Report",
  data() {
    return {
      startTime: "",
      endTime: "",
      startTimeUnix: 0,
      endTimeUnix: 0,
      listData,
      columns,
      pagination: {
        pageSize: 10, //给本地分页用的
        total: 10,
      },
      loading: false,
      page: 1,
      userinfo,
    };
  },
  methods: {
    formatTime(value: any) {
      // return value+"---1111";
      //注意：时间戳需是 13 位的时间戳
      const pattern = "YYYY-MM-DD hh:mm:ss";
      return moment(value * 1000).format(pattern);
    },
    doEdit(data: any) {
      console.log(data);
    },
    changeReportData(event: any) {
      console.log(event.current);
      this.page = event.current;
      this.getReportData();
    },
    getReportData() {
      this.loading = true;
      var api =
        "http://yuqing.itying.com/api/reportList?page=" +
        this.page +
        "&pageSize=" +
        this.pagination.pageSize +
        "&startTime=" +
        this.startTimeUnix +
        "&endTime=" +
        this.endTimeUnix;
      this.$axios
        .get(api, {
          auth: {
            username: this.userinfo.token,
            password: "",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success == false && response.data.message == "token_error") {
            message.error("token已经过期，请从新登录");
            this.$router.push({
              path: "/login",
            });
          } else if (response.data.success == true) {
            this.listData = response.data.result;
            this.pagination.total = response.data.total;
            this.loading = false;
          } else {
            message.error("token请求失败,刷新后重试");
          }
        });
    },
    doSearch() {
      let sObj = new Date(this.startTime);
      let eObj = new Date(this.endTime);
      this.startTimeUnix = Math.ceil(sObj.getTime() / 1000);
      this.endTimeUnix = Math.ceil(eObj.getTime() / 1000);
      this.page = 1;
      this.getReportData();
    },
  },
  mounted() {
    let userinfo = this.$storage.get("userinfo");
    this.userinfo = userinfo;
    this.getReportData();
  },
});
</script>
<style lang="scss" scoped>
.report_top {
  padding: 20px 10px;
  background: #fffced;
}
.search_btn {
  margin-left: 10px;
}
</style>
