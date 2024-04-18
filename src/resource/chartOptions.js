import { randomNum, formatDate } from '../Utils'

//风险饼图
export const riskChart_option = params => {
    let colors = ['#FF0000', '#FF7F00', '#F1DA8C', '#1383EE']
    const { t:name, d } = params
    const data = d.map(item => ({
        name: item.name,
        selected: true,
        y: item.val,
        color: colors[item.id - 1]
    }))
    return {
		chart: {
            type: 'pie',
            options3d: {
                    enabled: true,               //显示图表是否设置为3D
                    alpha: 60                   // 内旋转角度 从前后看 我理解为以x轴为基准的旋转  
            },
            backgroundColor: 'rgba(0,0,0,0)'    // 设置背景颜色透明 默认是白色
		},
		title: {
            text: ''
		},
		plotOptions: {
            pie: {
                size: 100,
                innerSize: '50%',
                depth: 20,   //3d高度
                // allowPointSelect: true,   //可选择
                cursor: 'pointer',
                dataLabels: {
                    enabled: false         //不显示label
                },
            }
		},
		series: [{ name, data}]
    }
}

//隐患饼图
export const dangerChart_option = params => {
    let colors = ['#3DAFEE', '#F85A5A', '#F1DA8C']
    const { t:name, d } = params
    const data = d.map(item => ({
        name: item.name,
        selected: true,
        y: item.val,
        color: colors[item.id - 1]
    }))
    return {
		chart: {
            type: 'pie',
            options3d: {
                    enabled: true,               //显示图表是否设置为3D
                    alpha: 60                   // 内旋转角度 从前后看 我理解为以x轴为基准的旋转  
            },
            backgroundColor: 'rgba(0,0,0,0)'    // 设置背景颜色透明 默认是白色
		},
		title: {
            text: ''
		},
		plotOptions: {
            pie: {
                size: 100,
                innerSize: '50%',
                depth: 20,   //3d高度
                // allowPointSelect: true,   //可选择
                cursor: 'pointer',
                dataLabels: {
                    enabled: false         //不显示label
                },
            }
		},
		series: [{ name, data}]
    }
}


//报警分析图
export const alarmChart_option = params => {
    let time = formatDate()

    return {
        chart: {
         type: 'area',
         backgroundColor: 'transparent',
         options3d: {
          enabled: true,
          alpha: 10,
          beta: 5,
          depth: 15
         }
        },
        title: {
         text: ""
        },
        legend: {
         enabled: false
        },
        credits: {
         enabled: false
        },
        yAxis: {
         title: {
          text: '',
         },
         labels: {
          skew3d: true,
          style: {
           color: '#ADCADD',
           fontSize: "14px",
          },
         },
         gridLineColor: 'rgba(173, 202, 221, 0.21)',
        },
        xAxis: [{
         visible: true,
         gridLineColor: 'rgba(173, 202, 221, 0)',
         labels: {
          skew3d: true,
          style: {
           color: '#ADCADD',
           fontWeight:"bold",
           fontSize: "12px",
          },
         },
         categories: ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06', '07-07'],
        }, {
         visible: false,
         labels: {
          skew3d: true,
          style: {
           color: '#ADCADD',
           fontWeight:"bold",
           fontSize: "12px",
          },
         },
         categories: ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06', '07-07'],
        }, {
         visible: false,
         labels: {
          skew3d: true,
          style: {
           color: '#ADCADD',
           fontWeight:"bold",
           fontSize: "12px",
          },
         },
         categories: ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06', '07-07'],
        }],
        plotOptions: {
         area: {
          depth: 50,
          marker: {
           enabled: false
          },
          states: {
           inactive: {
            enabled: false
           }
          },
         }
        },
        series: [
         {
          name: "视频分析报警",
          lineColor: 'rgba(19, 131, 238, 1)',
          fillColor: 'rgba(19, 131, 238, 0.88)',
          data: [
           ['07-01', 7],
           ['07-02', 4],
           ['07-03', 6],
           ['07-04', 3],
           ['07-05', 4],
           ['07-06', 2],
           ['07-07', 6]
          ]
         },
         {
          xAxis: 1,
          name: "人员定位报警",
          lineColor: 'rgba(29, 239, 255, 1)',
          fillColor: 'rgba(29, 239, 255, 0.66)',
          data: [
           ['07-01', 3],
           ['07-02', 5],
           ['07-03', 2],
           ['07-04', 4],
           ['07-05', 1],
           ['07-06', 7],
           ['07-07', 9]
          ]
         },
         {
          xAxis: 2,
          name: "重大危险源报警",
          lineColor: 'rgba(173, 202, 221, 1)',
          fillColor: 'rgba(173, 202, 221, 0.44)',
          data: [
           ['07-01', 4],
           ['07-02', 2],
           ['07-03', 0],
           ['07-04', 1],
           ['07-05', 0],
           ['07-06', 7],
           ['07-07', 2]
          ]
         }]
       }
    return 
}

//专项整改和风险整改
export const rectificatChart_option  = params => {
    let colors = ['rgba(20, 133, 240, 0.88)', 'rgba(28, 240, 254, 0.88)', 'rgba(242, 223, 159, 0.33)','rgba(233, 110, 137, 0.33)' ]
    const { seriesDtos, typeList } = params
    let series = colors.map((item, i) => ({
        name: seriesDtos[i].name,
        data: seriesDtos[i].data.map(i => Number(i)),
        color: item
    }))
    // console.log(series)
    return {
        chart: {
         type: 'column',
         backgroundColor: 'transparent',
         options3d: {
          enabled: true,
          alpha: 10,
          beta: 5,
          viewDistance: 100,
          depth: 80
         },
         
         marginLeft: 0,
         marginRight: 50,
         marginBottom: 50,
        },
        credits: {
         enabled: false
        },
        title: {
         text: ''
        },
        // legend: {
        //  enabled: false
        // },
        
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            // x: 150,
            // y: 20,
            floating: true,
            itemMarginTop: 8,
            symbolHeight: 12,
            itemStyle:{
                color:'#ADCADD',
                marginTop: '40px'
            }
        },
        xAxis: {
         gridLineColor: 'rgba(173, 202, 221, 0.21)',
         labels: {
          skew3d: true,
          style: {
           color: '#ADCADD',
           fontSize: "12px",
          },
         },
         categories: typeList
        },
        yAxis: {
         allowDecimals: false,
         min: 0,
         title: {
          text: ''
         },
         labels: {
          style: {
           color: '#ADCADD',
           fontSize: "14px",
          },
         },
         gridLineColor: 'rgba(173, 202, 221, 0.21)',
        },
        tooltip: {
         headerFormat: '<b>{point.key}</b><br>',
         pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },
        plotOptions: {
         column: {
          stacking: 'normal',
          maxPointWidth: '16',
          depth: 40
         }
        },
        
        series
    }
}