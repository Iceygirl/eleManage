
import { preSevenDay } from 'js/util'

// 指定图表的配置项和数据
export const options = {
    title: {
        text: '走势图'
    },
    xAxis: {
        data: preSevenDay()
    },
    yAxis: {},
    series: [{
        type: 'candlestick'
    }]
}


