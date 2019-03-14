<template>
    <div class="Main">
        <div class="dataWrap">
            <h3 class="title">数据统计</h3>
            <p class="dataRow">
                <label>当日数据：</label>
                <span class="data"><big>23</big>新增用户</span>
                <span class="data"><big>23</big>新增订单</span>
                <span class="data"><big>23</big>新增管理员</span>
            </p>
            <p class="dataRow">
                <label style="background-color:#20A0FF;">总数据：</label>
                <span class="data"><big>232424</big>注册用户</span>
                <span class="data"><big>2324242</big>订单</span>
                <span class="data"><big>232424</big>管理员</span>
            </p>
        </div>
        <!-- 折线图 -->
        <div class="echarts" ref="charts"></div>
    </div> 
</template> 
 
<script>

import echarts from 'echarts'
import { options } from 'js/charts'

export default {
    data() {
        return {
        } 
    },
    mounted() {
        // 初始化图表
        var myChart = echarts.init(this.$refs.charts)

        // 配置，显示图表 
        myChart.setOption(options)
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
.Main {
    .dataWrap {
        padding:20px;
        text-align:center;
        .title {
            font-size:30px;
            margin-bottom:30px;
        }
        .dataRow {
            margin-bottom:10px;
            label,.data {
                width:184px;
                padding:8px 0;
            }
            label {
                display: inline-block;
                font-size:22px;
                color:#fff;
                background-color:#FF9800;
                border-radius: 6px;
            }
            .data {
                    display: inline-block;
                    font-size: 14px;
                    color: #666;
                    border-radius: 6px;
                    background: #E5E9F2;
                    margin:0 10px;
                    padding:6px 0;
                    position: relative;
                    top:1px;
                big {
                    color: #333;
                    font-size: 26px;
                }
            }
        }
    }
    .echarts { 
        width:90%;
        height:500px;
        margin:30px auto 0;
    }
}
</style>
