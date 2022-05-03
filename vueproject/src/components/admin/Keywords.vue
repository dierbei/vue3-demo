<template>
  <div class="keywords_top">
    <a-button type="primary" @click="showAddModal">增加舆情关键词</a-button>
    <a-modal
      title="增加舆情关键词"
      v-model:visible="addVisible"
      @ok="doAddKeywords"
    >
      <ul class="input_list">
        <li>
          <span>必须包含关键词：</span>
          <a-input
            v-model:value="addInputData.keyword"
            placeholder="必须包含关键词"
          />
        </li>

        <li>
          <span>可包含关键词：</span
          ><a-input
            v-model:value="addInputData.may_keyword"
            placeholder="可包含关键词"
          />
        </li>

        <li>
          <span>不包含关键词：</span
          ><a-input
            v-model:value="addInputData.nokeyword"
            placeholder="不包含关键词"
          />
        </li>

        <li>
          <span> 监控频率：</span
          ><a-input
            v-model:value="addInputData.frequency"
            placeholder="监控频率"
          />
        </li>
      </ul>
    </a-modal>

    <a-modal
      title="修改舆情关键词"
      v-model:visible="editVisible"
      @ok="doEditKeywords"
    >
      <ul class="input_list">
        <li>
          <span>必须包含关键词：</span>
          <a-input
            v-model:value="editInputData.keyword"
            placeholder="必须包含关键词"
          />
        </li>

        <li>
          <span>可包含关键词：</span
          ><a-input
            v-model:value="editInputData.may_keyword"
            placeholder="可包含关键词"
          />
        </li>

        <li>
          <span>不包含关键词：</span
          ><a-input
            v-model:value="editInputData.nokeyword"
            placeholder="不包含关键词"
          />
        </li>

        <li>
          <span> 监控频率：</span
          ><a-input
            v-model:value="editInputData.frequency"
            placeholder="监控频率"
          />
        </li>
      </ul>
    </a-modal>
  </div>

  <a-table
    :columns="columns"
    :data-source="listData"
    :pagination="false"
    :row-key="(record) => record.id"
    :loading="loading"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{ text }">
      <a-button type="primary" @click="editKeywords(text.id)">编辑</a-button>
      <a-button type="danger" class="delete" @click="deleteKeywords(text.id)"
        >删除</a-button
      >
    </template>
  </a-table>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent } from "vue";
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
    slots: { customRender: "action" },
    align: "center",
    width: 200,
  },
];

let listData: any[];
let userinfo: any;
export default defineComponent({
  name: "Keywords",
  data() {
    return {
      columns,
      listData,
      addVisible: false,
      editVisible: false,
      loading: false,
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
      userinfo,
    };
  },
  methods: {
    doAddKeywords() {
      let api = "http://yuqing.itying.com/api/addKeywords";
      this.$axios
        .post(api, this.addInputData, {
          auth: {
            username: this.userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {
          if (response.data.success == true) {
            console.log(response);
            this.addVisible = false;
            //获取舆情关键词
            this.getKeywordsList();
          } else if (
            response.data.success == false &&
            response.data.message == "token_error"
          ) {
            message.error("token已经过期，请从新登录");
            this.$router.push({
              path: "/login",
            });
          }
        });
    },
    //修改舆情关键词
    editKeywords(id: number): void {
      // alert(id)
      console.log(id);
      let api = "http://yuqing.itying.com/api/oneKeywordsList?id=" + id;
      this.$axios
        .get(api, {
          auth: {
            username: this.userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {
          console.log(response);
          if (response.data.success == true) {
            this.editInputData = response.data.result;
          } else if (
            response.data.success == false &&
            response.data.message == "token_error"
          ) {
            message.error("token已经过期，请从新登录");
            this.$router.push({
              path: "/login",
            });
          } else {
            message.error("获取数据失败 重试");
          }
          this.editVisible = true;
        });
    },
    //执行修改
    doEditKeywords() {
      let api = "http://yuqing.itying.com/api/editKeywords";

      this.$axios
        .post(api, this.editInputData, {
          auth: {
            username: this.userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {
          if (response.data.success) {
            this.getKeywordsList();
          } else if (
            response.data.success == false &&
            response.data.message == "token_error"
          ) {
            message.error("token已经过期，请从新登录");
            this.$router.push({
              path: "/login",
            });
          } else {
            message.error("修改失败，重试");
          }
          this.editVisible = false;
        });
    },
    //删除舆情关键词
    deleteKeywords(id: any) {
      let flag = confirm("确定要删除这个数据吗?");
      if (flag) {
        let api = "http://yuqing.itying.com/api/deleteKeywords?id=" + id;
        this.$axios
          .get(api, {
            auth: {
              username: this.userinfo.token,
              password: "",
            },
          })
          .then((response: any) => {
            if (response.data.success) {
              this.getKeywordsList();
            } else if (
              response.data.success == false &&
              response.data.message == "token_error"
            ) {
              message.error("token已经过期，请从新登录");
              this.$router.push({
                path: "/login",
              });
            } else {
              message.error(response.data.message);
            }
          });
      }
    },
    showAddModal() {
      this.addVisible = true;
    },
    /*
      jwt auth2  

      headers: {
                      'Authorization': 'Bearer ' + token,
      }

    */
    getKeywordsList() {
      this.loading = true;
      let api = "http://yuqing.itying.com/api/keywordsList";
      this.$axios
        .get(api, {
          //base auth
          auth: {
            username: this.userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {
          if (
            response.data.success == false &&
            response.data.message == "token_error"
          ) {
            message.error("token已经过期，请从新登录");
            this.$router.push({
              path: "/login",
            });
          } else if (response.data.success == true) {
            console.log(response);
            this.listData = response.data.result;
            this.loading = false;
          } else {
            message.error("token请求失败,刷新后重试");
          }
        });
    },
  },
  mounted() {
    let userinfo = this.$storage.get("userinfo");
    this.userinfo = userinfo;
    //获取舆情关键词
    this.getKeywordsList();
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.keywords_top {
  padding: 20px 10px;
  background: #fffced;
  margin: 10px;
}
.delete {
  margin-left: 10px;
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
</style>
