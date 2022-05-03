<template>
  <div id="pieContainer" style="width: 100%; height: 400px"></div>

  <div id="columnContainer" style="width: 100%; height: 400px"></div>
</template>

<script>
import * as Highcharts from "highcharts";

export default {
  data() {
    return {

    }
  },

  mounted() {
    this.pieFn();
    this.columnFn();
  },

  methods: {
    pieFn() {
      Highcharts.chart("pieContainer", {
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
          text: "人口分布图",
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
        series: [
          {
            name: "人口数",
            colorByPoint: true,
            data: [
              {
                name: "深圳",
                y: 6111111,
                sliced: true,
                selected: true,
              },
              {
                name: "北京",
                y: 8312421,
              },
              {
                name: "上海",
                y: 5312421,
              },
              {
                name: "广州",
                y: 4532421,
              },
            ],
          },
        ],
      });
    },

    columnFn() {
      Highcharts.chart("columnContainer", {
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
          categories: ["一月", "二月", "三月", "四月", "五月", "六月"],
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
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
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
          {
            name: "正面舆情",
            data: [439, 715, 104, 1292, 144, 176.0],
          },
          {
            name: "负面舆情",
            data: [299, 104, 106.4, 129.2, 144.0, 176.0],
          },
        ],
      });
    },
  }
}
</script>

<style scoped>

</style>