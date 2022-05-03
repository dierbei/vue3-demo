<template>
  <div id="pieContainer" style="width: 100%; height: 400px"></div>
  <div id="columnContainer" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import * as Highcharts from "highcharts";
import { message } from "ant-design-vue";
//axios
import Axios from "axios";
//Storage
import Storage from "../../models/storage";

import {useRouter} from "vue-router";

export default defineComponent({
  name: "Home",


  setup() {
    let router = useRouter();
    let userinfo: any;
    let pieContainerObj:any;
    let columnContainerObj:any;
    onMounted(() => {
      userinfo = Storage.get("userinfo");

      //渲染饼状图
      pieContainerObj = (Highcharts as any).chart("pieContainer", {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            backgroundColor: "#eee",
          },
          credits: {
            enabled: false, //去掉版权
          },
          title: {
            text: "舆情关键词分布图",
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                style: {
                  color: "black",
                },
              },
            },
          },
          series: [],
        });

      //渲染柱状图
      columnContainerObj = (Highcharts as any).chart("columnContainer", {
        chart: {
          type: "column",
        },
        title: {
          text: "舆情分布",
        },
        subtitle: {
          text: "数据来源: itying.com",
        },
        xAxis: {
          categories: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "舆情数",
          },
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            borderWidth: 0,
          },
        },
        series: [
        ],
      });


      //请求数据
      getPieData();
      getColumnData();
    });

  
      //定义请求数据的方法 渲染数据

    let getPieData=()=> {
      let api = "http://yuqing.itying.com/api/areaOptions";
      Axios.get(api, {
          auth: {
            username: userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {
          console.log(response);
          if (response.data.success) {           
            let temArr = [];
            for (let i = 0; i < response.data.result.length; i++) {
              if (i == 0) {
                temArr.push({
                  name: response.data.result[i].title,
                  y: response.data.result[i].count,
                  sliced: true,
                  selected: true,
                });
              } else {
                temArr.push({
                  name: response.data.result[i].title,
                  y: response.data.result[i].count,
                });
              }
            }
            pieContainerObj.addSeries({
              name: "舆情关键词数量",
              colorByPoint: true,
              data: temArr,
            });
          } else if (
            response.data.success == false &&
            response.data.message == "token_error"
          ) {
            message.error("token已经过期，请从新登录");
            router.push({
              path: "/login",
            });
          } else {
            message.error("传入参数错误");
          }
        });
    };
    let getColumnData=()=> {
      let api = "http://yuqing.itying.com/api/columnOptions";
      Axios.get(api, {
          auth: {
            username: userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {
          console.log(response);
          if (response.data.success) {
            //  console.log(response.data);
            for (let i = 0; i < response.data.result.length; i++) {
              columnContainerObj.addSeries({
                name: response.data.result[i].title,
                data: response.data.result[i].data,
              });
            }
          } else if (
            response.data.success == false &&
            response.data.message == "token_error"
          ) {
            message.error("token已经过期，请从新登录");
            router.push({
              path: "/login",
            });
          } else {
            message.error("传入参数错误");
          }
        });
    }

    return{

    }
  },
});
</script>
