<script setup>
    import { reactive, onMounted, computed } from 'vue'
    import { leftLay } from '../resource/layoutRe'
    import { workArrData, riskArrData, dangerArrData } from '../resource/leftRe'
    import { riskChart_option, dangerChart_option } from '../resource/chartOptions'
    import { getSrc } from '../Utils'

    import Container from "./Container.vue"
    import ImgItem from './widget/ImgItem.vue'
    import HighChart from './widget/HighChart.vue'


    //接收的参数
    const props = defineProps({
        data: Object
    })


    //定义数据
    const state = reactive({
        
    })

    //把接口的数据添加到数组里
    const pushArrVal= arr => arr.map(item => ({...item, val: props.data[item.key]}))
    
    //风险的饼图数据
    const riskChartData = computed(() => ({
        t: '风险分级',
        d: pushArrVal(riskArrData)
    }))

    //隐患的饼图数据
    const dangerChartData = computed(() => ({
        t: '隐患排查',
        d: pushArrVal(dangerArrData)
    }))

    
    //隐患的饼图数据
    const imgItemConfig = computed(() => ({
        leftImg: 'ai-work.png',
        botImg: 'work-total.png',
        msg: '作业票总计',
        val: props.data['docTotal']
    }))

</script>

<template>
    <div class = 'leftCom'>
        <div class = 'leftComTop'>
                <Container :config = 'leftLay[0]'>
                    <div class = 'leftComTopLeft'>
                        <div class = 'leftComTopLeftT'>
                            <HighChart :id = '`leftRiskChart`' :option.sync = 'riskChart_option(riskChartData)'/>
                        </div>
                        <div class = 'leftComTopLeftB'>
                            <div  class = 'leftComTopLeftItem' v-for = 'item in riskChartData.d' :key="item.id">
                                <div class = 'leftComTopLeftItemL'>
                                    <img :src="getSrc(item.icon, 'kaisheng')" alt="">
                                    <span>{{item.name}}</span>
                                </div>
                                <div class = 'leftComTopLeftItemR'>{{item.val}}</div>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container :config = 'leftLay[1]'>
                    <div class = 'leftComTopRight'>
                        <div class = 'leftComTopRightT'>
                            <HighChart :id = '`leftDangerChart`' :option.sync = 'dangerChart_option(dangerChartData)'/>
                        </div>
                        <div class = 'leftComTopRightB'>
                            <div  class = 'leftComTopRightItem' v-for = 'item in dangerChartData.d' :key="item.id">
                                <div class = 'leftComTopRightItemFir'>{{item.val}}</div>
                                <div class = 'leftComTopRightItemSec'>
                                    <img :src="getSrc(item.icon, 'kaisheng')" alt="">
                                    <span>{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
        </div>
        <div class = 'leftComBot'>
            <Container :config = 'leftLay[2]'>
                <div class="leftComBotCon">
                    <div class = 'leftComBotConT'>
                        <ImgItem :config.sync="imgItemConfig"/>
                    </div>
                    <div class = 'leftComBotConSec'>
                        <div class = 'leftComBotConSecItem' v-for = 'item in pushArrVal(workArrData)' :key="item.id">
                            <div class = 'leftComBotConSecItemL'>
                                <img src="../assets/kaisheng/pc-work-icon-bg.png" alt="">
                                <img :src="getSrc(item.icon, 'kaisheng')" alt="">  
                            </div>
                            <div class = 'leftComBotConSecItemR'>
                                <div>{{item.val}}</div>
                                <div class = 'leftComBotConSecItemRMSG'>{{item.title}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    </div>
</template>

<style scoped>
.leftCom{
    width: 21%;
    max-width: 404px;
    min-width: 366px;
    /* height: calc( 100% - 350px ); */
    /* height: 67.4%; */
    
    height: calc( 100% - 21.67% - 105px );
    max-height: 730px;
    position: absolute;
    top: 86px;
    left: 15px;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
}

.leftComTop{
    height: 33.5%;
    display: flex;
}

.leftComTop>div{
    flex:1;
}

.leftComTop>div:nth-child(1){
    margin-right: 15px;
}
.leftComTopLeft,.leftComTopRight{
    height: calc( 100% - 26px );
}
.leftComTopLeftT,.leftComTopRightT{
    height: 60%;
}


.leftComTopLeftB{
    height: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around;
    padding: 10px;
    padding-top: 4px;
    box-sizing: border-box;
}

.leftComTopLeftItem{
    width: 46%;
    margin: 4px 0;
    display: flex;
    height: 18px;
    line-height: 18px;
}


.leftComTopLeftItemL{
    width: 36px;
    position: relative;
    color: #ADCADD;
    opacity: 0.7;
}

.leftComTopLeftItemL>img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.leftComTopLeftItemR{
    width: calc( 100% - 36px );
    margin-left: 12px;
    font-family: ShangShouRuiLengTi2;
    font-size: 20px;
    color: #EDF8FF;
}


.leftComTopRightB{
    height: 40%;
    display: flex;
    justify-content: space-around;
    padding: 6px;
    padding-top: 4px;
    box-sizing: border-box
}

.leftComTopRightItem{
    width: 30%;
}
.leftComTopRightItemFir{
    font-size: 20px;
    font-family: ShangShouRuiLengTi2;
    height: 22px;
    color: #EDF8FF;

}

.leftComTopRightItemSec{
    margin-top: 6px;
    height: 20px;
    line-height: 20px;
    position: relative;
    color: #ADCADD;
    opacity: 0.7;
    display: flex;
    justify-content: center;
}

.leftComTopRightItemSec>img{
    /* width: 60px; */
    height: 40px;
    position: absolute;
    top: -8px;
}

.leftComBot{
    /* height: 468px; */
    /* flex: 1; */
    height: 66.5%;
    margin-top: 8px;
}

.leftComBotCon{
    height: calc( 100% - 30px );
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.leftComBotConT{
    height: 42%;
}

.leftComBotConSec{
    flex:1;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2%;
}

.leftComBotConSecItem{
    width: 32%;
    height: 32%;
    margin-right: 1%;
    margin-bottom: 1%;
    display: flex;
    align-items: center;
}

.leftComBotConSecItemL{
    width: 30px;
    height: 36px;
    position: relative;
}

.leftComBotConSecItemL>img{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
}


.leftComBotConSecItemL>img:nth-child(1){
    width: 100%;
    height: 100%;
}
.leftComBotConSecItemL>img:nth-child(2){
    width: 60%;
}

.leftComBotConSecItemR{
    flex: 1;
    /* font-size: 24px; */
    font-size: 22px;
    color: #EDF8FF;
    font-family: ShangShouRuiLengTi2;
    line-height: 24px;
    /* line-height: 28px; */
    text-align: left;
    padding-left: 15px;
    box-sizing: border-box;
}
.leftComBotConSecItemRMSG{
    /* font-size: 14px; */
    font-size: 12px;
    color: #ADCADD;
    opacity: 0.7;
    /* line-height: 20px; */
    line-height: 16px;
}
</style>
