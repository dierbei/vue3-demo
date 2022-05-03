<template>
  <div class="keywords_top">
    <a-button type="primary" @click="showAddModal()">增加舆情关键词</a-button>

    <a-modal
        title="增加舆情关键词"
        v-model:visible="addVisible"
        @ok="doAddKeywords">
      <ul class="input_list">
        <li>
          <span>必须包含关键词：</span>
          <a-input
              v-model:value="addInputData.keyword"
              placeholder="必须包含关键词"/>
        </li>

        <li>
          <span>可包含关键词：</span>
          <a-input
              v-model:value="addInputData.may_keyword"
              placeholder="可包含关键词"/>
        </li>

        <li>
          <span>不包含关键词：</span>
          <a-input
              v-model:value="addInputData.nokeyword"
              placeholder="不包含关键词"/>
        </li>

        <li>
          <span> 监控频率：</span>
          <a-input
              v-model:value="addInputData.frequency"
              placeholder="监控频率"/>
        </li>
      </ul>
    </a-modal>

    <a-modal
        title="修改舆情关键词"
        v-model:visible="editVisible"
        @ok="doEditKeywords">
      <ul class="input_list">
        <li>
          <span>必须包含关键词：</span>
          <a-input
              v-model:value="editInputData.keyword"
              placeholder="必须包含关键词"/>
        </li>

        <li>
          <span>可包含关键词：</span>
          <a-input
              v-model:value="editInputData.may_keyword"
              placeholder="可包含关键词"/>
        </li>

        <li>
          <span>不包含关键词：</span>
          <a-input
              v-model:value="editInputData.nokeyword"
              placeholder="不包含关键词"/>
        </li>

        <li>
          <span> 监控频率：</span>
          <a-input
              v-model:value="editInputData.frequency"
              placeholder="监控频率"/>
        </li>
      </ul>
    </a-modal>

  </div>

  <a-table
      :columns="columns"
      :data-source="listData"
      :pagination="false"
      :row-key="(record) => record.id"
  >
    <template v-slot:bodyCell="{column, record}">

      <template v-if="column.dataIndex === 'keyword'">
        <span>{{ record.keyword }}</span>
      </template>

      <template v-if="column.dataIndex === 'may_keyword'">
        <span>{{ record.may_keyword }}</span>
      </template>

      <template v-if="column.dataIndex === 'nokeyword'">
        <span>{{ record.nokeyword }}</span>
      </template>

      <template v-if="column.dataIndex === 'frequency'">
        <span>{{ record.frequency }}</span>
      </template>

      <template v-if="column.dataIndex === 'action'">
        <a-button type="primary" @click="editKeywords(record.id)">编辑</a-button>
        <a-button type="danger" class="delete" @click="deleteKeywords(record.id)">删除</a-button>
      </template>

    </template>

  </a-table>
</template>

<script>
import { message } from "ant-design-vue";

const columns = [
  {
    title: "必须包含关键词",
    dataIndex: "keyword",
    key: "keyword",
    align: "center",
  },
  {
    title: "可包含关键词",
    dataIndex: "may_keyword",
    key: "may_keyword",
    align: "center",
  },
  {
    title: "不包含关键词",
    dataIndex: "nokeyword",
    key: "nokeyword",
    align: "center",
  },
  {
    title: "监控频率",
    dataIndex: "frequency",
    key: "frequency",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
    // slots: { customRender: "action" },
    align: "center",
    width: 200,
  },
];

const listData = [
  {
    id: 1,
    keyword: "大庆油田",
    may_keyword: "中国石油",
    nokeyword: "延长石油",
    frequency: "100",
  },
  {
    id: 2,
    keyword: "贪污",
    may_keyword: "腐败",
    nokeyword: "打腐败",
    frequency: "100",
  },
];

export default {
  data() {
    return {
      addVisible: false,
      editVisible: false,
      columns,
      listData,
      startTime: "",
      endTime: "",
      addInputData: {
        keyword: "",
        may_keyword: "",
        nokeyword: "",
        frequency: "",
      },
      editInputData: {
        id: "",
        keyword: "",
        may_keyword: "",
        nokeyword: "",
        frequency: "",
      },
    };
  },

  methods: {
    doAddKeywords() {
      let api = "http://yuqing.itying.com/api/addKeywords";
      this.axios.post(api, this.inputData, {
        auth: {
          username: this.userinfo.token,
          password: ''
        }
      }).then((response) => {
        console.log(response)
        this.addVisible = false;
        this.getKeywordsList()
      })
    },

    showAddModal() {
      this.addVisible = true
    },

    getKeywordsList() {
      this.loading = true;
      let api = "http://yuqing.itying.com/api/keywordsList";
      this.axios.get(api, {  //base auth
        auth: {
          username: this.userinfo.token,
          password: ''
        },
      }).then((response) => {
        this.listData = response.data.result;
        this.loading = false;
      })
    },

    // 查询修改舆情关键词信息
    editKeywords(id) {
      let api = "http://yuqing.itying.com/api/oneKeywordsList?id=" + id;
      this.axios.get(api, {auth: {username: this.userinfo.token, password: "",}})
          .then((response) => {
            if (response.data.success == true) {
              this.editInputData = response.data.result;
            }
            this.editVisible = true;
          });
    },

    //执行修改
    doEditKeywords() {
      let api = "http://yuqing.itying.com/api/editKeywords";
      this.axios
          .post(api, this.editInputData, {
            auth: {
              username: this.userinfo.token,
              password: "",
            },
          })
          .then((response) => {
            if (response.data.success) {
              this.getKeywordsList();
            }
            this.editVisible = false;
          });
    },

    //删除舆情关键词
    deleteKeywords(id) {
      let flag = confirm("确定要删除这个数据吗?");
      if (flag) {
        let api = "http://yuqing.itying.com/api/deleteKeywords?id=" + id;
        this.axios
            .get(api, {
              auth: {
                username: this.userinfo.token,
                password: "",
              },
            })
            .then((response) => {
              if (response.data.success) {
                this.getKeywordsList();
              } else {
                message.error(response.data.message)
              }
            });
      }
    },
  },

  mounted() {
    let userinfo = this.storage.get("userinfo");
    this.userinfo = userinfo;
    this.getKeywordsList()
  }
}
</script>

<style lang="scss" scoped>
.keywords_top {
  padding: 20px 10px;
  background: #fffced;
  margin: 10px;
}

ul {
  list-style: none;
}

.input_list {
  padding: 0px;

  li {
    line-height: 36px;

    span {
      display: inline-block;
      width: 120px;
    }

    input {
      width: 300px;
    }
  }
}

.delete {
  margin-left: 10px;
}
</style>