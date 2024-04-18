<script setup>
    import { reactive, computed, defineExpose } from 'vue'
    import { bottomLay } from '../resource/layoutRe'
    import { BotLeftSec, botCenterData, BotLeftThrD } from '../resource/bottomRe'
    import { rectificatChart_option } from '../resource/chartOptions'
    import { getSrc } from '../Utils'
    import { getTwoDoorCount}  from '../interface'

    import Container from "./Container.vue"
    import HighChart from './widget/HighChart.vue'
import Axios from 'axios'



    //接收的参数
    const props = defineProps({
        data: Object
    })



    //定义数据
    const state = reactive({
        rectificatId: 1,
        personCount:{branchList:{}},
        twodoorCount: {branchList:{}},
        leftTabId: 1
    })

    // const { hiddenDangerDto, riskDangerDto } = props.data

    // getTwoDoorCount().then(res => {
    Axios.get('https://222.173.243.142:7788/sft/pub/data/per/count').then(r => {
        let res = r.data
        if(!res.success) return
        let all = 0
        res.t.map(item => {
            all += item.people_num
            item.name = item.part_name.split('/').pop()
            return item
        })
        state.twodoorCount = {
            all,
            branchList: res.t.reduce((pre, item) => {
                pre[item.name] = item.people_num
                return pre
            }, {})
        }
        console.log(state.twodoorCount)
    })

    // Axios.get('http://lyrf.zhihuihse.com//public/screen/getStatics/11').then(res => console.log(res))
    
    // Axios.get('https://222.173.243.142:7788/sft/pub/data/per/count').then(res => console.log(res))

    const rectificatTabClick = id => {
        console.log(id)
        state.rectificatId = id
    }
    //左边标题点击事件
    const personCountClick = id => {
        // console.log(state.personCount)
        // state.allCount = id == 1? state.personCount.all: state.twodoorCount
        state.leftTabId = id
    }
    // state.allCount = state.personCount.all

    //风险的整改数据
    const RectifChartData = computed(() => state.rectificatId == 1? props.data.hiddenDangerDto: props.data.riskDangerDto)
    
    //隐患的饼图数据
    // const dangerRectifChartData = computed(() => props.data.hiddenDangerDto)

    //获取人员数据
    defineExpose({getPersonCount: (count => state.personCount = count)})

</script>

<template>
    <div class = 'BottomCom'>
        <div class = 'BottomComLeft'>
            <Container :config = 'bottomLay[0]' @containerTabClick='personCountClick'>
                <div class = 'BottomComLeftCon'>
                    <div class = 'BottomComLeftFir'>
                        <img src="../assets/kaisheng/ai-person.png" alt="">
                    </div>
                    <div class = 'BottomComLeftSec'>
                        <div class = 'BottomComLeftSecItem' v-for = 'item in BotLeftSec' :key="item.id">
                            <div class = 'BottomComLeftSecT' v-show = 'item.key'>{{(state.leftTabId == 1? state.personCount.all: state.twodoorCount.all) || 0}}</div>
                            <div class = 'BottomComLeftSecB' v-show = 'item.name'>{{item.name}}</div>
                        </div>
                    </div>
                    <div class = 'BottomComLeftThr scroll_bar'>
                        <div class = 'BottomComLeftThrCon'>
                            <div class = 'BotLeftThrLine'></div>
                            <!-- <div class = 'BotLeftThrItem' v-for = 'item in BotLeftThrD' :key="item.id">
                                <div class = 'BotLeftThrItemName overflow'>{{item.name}}</div>
                                <div class = 'BotLeftThrItemVal'>{{item.key}}</div>
                            </div> -->
                            <div class = 'BotLeftThrItem' v-for = '(val, key) in (state.leftTabId == 1?state.personCount.branchList:state.twodoorCount.branchList )' :key="key">
                                <div class = 'BotLeftThrItemName overflow'>{{key||'其他'}}</div>
                                <div class = 'BotLeftThrItemVal'>{{val}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <div class = 'BottomComCenter'>
            <Container :config = 'bottomLay[1]'>
                <div class = 'BotCenterCon'>
                    <div class = 'BotCenterItem' v-for = 'item in botCenterData'>
                        <img :src="getSrc(item.icon, 'kaisheng')" alt="">
                        <div v-show = 'item.name' class = 'BotCenterItemVal'>{{item.name}}</div>
                    </div>
                </div>
            </Container>
        </div>
        <div class = 'BottomComRight'>
            <Container :config = 'bottomLay[2]' @containerTabClick='rectificatTabClick'>
                <div class = 'BotRightChartCon'>
                    <HighChart :id = '`bottomDangerChart`' :option.sync = 'rectificatChart_option(RectifChartData)'/>
                </div>
            </Container>
        </div>
    </div>
</template>

<style scoped>
.BottomCom{
    width: calc( 100% - 30px );
    height: 21.67%;
    position: absolute;
    left: 15px;
    bottom: 10px;
    display: flex;
    justify-content: space-evenly;
    pointer-events: auto;
}

.BottomComLeft{
    width: 40%;
}

.BottomComLeftCon{
    height: calc( 100% - 36px );
    display: flex;
}

.BottomComLeftFir{
    width: 32%;
    height: clac( 100% - 20px );
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
}

.BottomComLeftFir>img{
    width: 100%;
}

.BottomComLeftSec{
    width: 64px;
    margin: 0 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}


.BottomComLeftSecItem{
    min-width: 20%;
    font-family: ShangShouRuiLengTi2;
    font-size: 22px;
    color: #EDF8FF;
    margin-top: 5px;
}

.BottomComLeftSecB{
    padding: 0 9px;
    height: 22px;
    line-height: 22px;
    background-image: url('../assets/kaisheng/screen-fx-IV.png');
    background-size:100% 100%;
    color: rgb(116, 141, 160);
    font-size: 12px;
}


.BottomComLeftThr{
    width: calc( 100% - 32% - 94px );
    padding: 8px;
    box-sizing: border-box;
    overflow: auto;
}
.BottomComLeftThrCon{
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: start;
}
.BotLeftThrLine{
    position: absolute;
    left: 50%;
    width: 0;
    height: 100%;
    border-left: 2px dashed rgb(30, 50, 70);
}

.BotLeftThrItem{
    width: 44%;
    height: 14px;
    line-height: 14px;
    border-left: 1px solid #0572F2;
    padding-left: 8px;
    box-sizing: border-box;
    margin: 6px 0;
    text-align: left;
    display: flex;
    justify-content: space-between;
}
.BotLeftThrItemName{
    width: calc( 100% - 40px );
}
.BotLeftThrItemVal{
    width: 28px;
    font-family: ShangShouRuiLengTi2;
    font-size: 16px;
    color: #EDF8FF;
    text-align: right;
}



.BottomComCenter{
    width: 18.2%;
}
.BotCenterCon{
    height: calc( 100% - 18px );
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
}
.BotCenterItem{
    width: calc( 30% - 0px );
    /* width: 30%; */
    /* margin: 6px 0px; */
    display: flex;
    justify-content: space-evenly;
}
.BotCenterItem>img{
    width: 18px;
    /* height: 18px; */
}
.BotCenterItemVal{
    width: 50px;
}
.BottomComRight{
    width: 40%;
}

.BotRightChartCon{
    height: calc( 100% - 28px );
}

</style>
