import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar'; //引入雷达图
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class VisualCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        const { stuScoreData } = this.props.visual;
        this.charts = echarts.init(document.getElementsByClassName("vis-charts-ctn")[0]);
        let data = [[
            ...stuScoreData.map((item) => {
                return item.calScore
            })
        ]];
        let option = {
            title: {
                text: `${stuScoreData[0].stuName} 成绩雷达图`,
                left: "center",
                textStyle: {
                    lineHeight: 30
                }
            },
            tooltip: {},
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: stuScoreData.map((item, idx) => {
                    return {
                        name: `${item.subSort}-${item.subName}`,
                        max: 100
                    }
                })
            },
            series: [{
                name: '成绩雷达图',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: data
            }]
        };
        this.charts.setOption(option);
    };
    deepCompare = (a, b) => {
        if (a === null
            || typeof a !== 'object'
            || b === null
            || typeof b !== 'object') {
            return a === b
        }

        const propsA = Object.getOwnPropertyDescriptors(a)
        const propsB = Object.getOwnPropertyDescriptors(b)
        if (Object.keys(propsA).length !== Object.keys(propsB).length) {
            return false
        }

        return Object.keys(propsA).every(key => this.deepCompare(a[key], b[key]))

    }
    componentWillReceiveProps(nextProps) {
        if (!this.deepCompare(nextProps.visual.stuScoreData,this.props.visual.stuScoreData)) {
            const { stuScoreData } = nextProps.visual;
            let data = [[
                ...stuScoreData.map((item) => {
                    return item.calScore
                })
            ]];
            let option = {
                title: {
                    text: `${stuScoreData[0].stuName} 成绩雷达图`,
                    left: "center",
                    textStyle: {
                        lineHeight: 30
                    }
                },
                tooltip: {},
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: stuScoreData.map((item, idx) => {
                        return {
                            name: `${item.subSort}-${item.subName}`,
                            max: 100
                        }
                    })
                },
                series: [{
                    name: '成绩雷达图',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: data
                }]
            };
            this.charts.setOption(option);
        }
    }
    render() {
        return (
            <div className="vis-charts-ctn">

            </div>
            
        )
    }
}
function select(state) {
    return {
        visual: state.visual
    }
}
export default connect(select)(VisualCharts);

