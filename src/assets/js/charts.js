
import { preSevenDay } from 'js/util'

// 指定图表的配置项和数据
export const options = {
    color:['#5793f3', '#675bba', '#d14a61'],
    title: {
        text: '走势图'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['新注册用户', '新增订单', '新增管理员'],
        show:true
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['bar', 'line']},
            restore: {},
        }
    },
    xAxis: {
        data: preSevenDay(),
        type:'category',
        boundaryGap: false
    },
    yAxis: [{
        type:'value',
        name:'用户',
        min:0,
        max:200,
        position:'left',
        axisLine:{
            lineStyle:{
                color:'#999'
            }
        },
        axisLabel: {
            formatter: '{value}'
        }
    },{
        type:'value',
        name:'订单',
        min:0,
        max:200,
        position:'right',
        axisLine:{
            lineStyle:{
                color:'#999'
            }
        },
        axisLabel: {
            formatter: '{value}'
        }
    }],
    series: [{
            name:'新注册用户',
            type:'line',
            data:[20,50,100,120,170,78,90],
            yAxisIndex: 1,
            markPoint: {
                data: [
                    {
                        type: 'max', 
                        name: '最大值'
                    },{
                        type: 'min',
                        name: '最小值'
                    }
                ]
            }
        },{
            name:'新增订单',
            type:'line',
            data:[100,60,60,45,30,60,90],
            yAxisIndex: 1,
            markPoint: {
                data: [
                    {
                        type: 'max', 
                        name: '最大值'
                    },{
                        type: 'min',
                        name: '最小值'
                    }
                ]
            }
        },{
            name:'新增管理员',
            type:'line',
            data:[80,90,100,200,80,90,100],
            yAxisIndex: 1,
            markPoint: {
                data: [
                    {
                        type: 'max', 
                        name: '最大值'
                    },{
                        type: 'min',
                        name: '最小值'
                    }
                ]
            }
        }]
}


