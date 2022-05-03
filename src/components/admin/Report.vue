<template>
  <div class="report_top">
    <a-date-picker v-model:value="startTime" placeholder="起始日期"/>
    -
    <a-date-picker v-model:value="endTime" placeholder="截止日期"/>

    <a-button type="primary" class="search_btn">搜索</a-button>
  </div>

  <a-table
      :columns="columns"
      :data-source="listData"
      :row-key="(record) => record.id"
      :pagination="pagination"
      :loading="loading"
      @change="changeReportData">

    <template v-slot:bodyCell="{column, record}">

      <template v-if="column.dataIndex === 'title'">
        <span>{{record.title}}</span>
      </template>

      <template v-if="column.dataIndex === 'type'">
        <span v-if="record.type==1">正面舆情</span>
        <span v-else>负面舆情</span>
      </template>

      <template v-if="column.dataIndex === 'keywords'">
        <span>{{record.keywords}}</span>
      </template>

      <template v-if="column.dataIndex === 'url'">
        <span>{{record.url}}</span>
      </template>

      <template v-if="column.dataIndex === 'add_time'">
        <span>{{record.add_time}}</span>
      </template>

      <template v-if="column.dataIndex === 'action'">
        <a-button type="primary">编辑</a-button>
        <a-button type="danger" class="delete">删除</a-button>
      </template>

    </template>

  </a-table>
</template>

<script>
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
    // slots: { customRender: "myType" },
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
    // slots: { customRender: "myUrl" },
  },
  {
    title: "发现时间",
    dataIndex: "add_time",
    key: "add_time",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
  },
];

export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      listData: [],
      columns,
      pagination: {
        pageSize: 10,
        total: 10,
      },
      loading: false,
      page:1
    };
  },
  methods: {
    doEdit(data) {
      console.log(data);
    },
    changeReportData(event) {
      console.log(event.current)
      this.page=event.current;
      this.getReportData()
    },
    getReportData(){
      this.loading=true;
      var api = "http://yuqing.itying.com/api/report?page="+this.page+"&pageSize="+this.pagination.pageSize;
      this.axios.get(api).then((response) => {
        console.log(response.data.result);
        this.listData=response.data.result;
        this.pagination.total=response.data.total;
        this.loading=false;
      });
    }
  },
  mounted() {
    this.getReportData();
  },
}
</script>
<style scoped>
.report_top {
  padding: 20px 10px;
  background: #fffced;
}

.search_btn {
  margin-left: 10px;
}

.delete {
  margin-top: 10px;
}
</style>