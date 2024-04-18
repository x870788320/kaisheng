<script setup>
    import { reactive, computed } from 'vue'
    import { rightLay } from '../resource/layoutRe'
    import { alarmNav } from '../resource/rightRe'
    import { alarmChart_option } from '../resource/chartOptions'
    import { getSrc } from '../Utils'

    import Container from "./Container.vue"
    import ImgItem from './widget/ImgItem.vue'
    import HighChart from './widget/HighChart.vue'


    const imgPat = '../assets/kaisheng/'
    const formanSrc = src =>  new URL(src, import.meta.url).href

    //接收的参数
    const props = defineProps({
        data: Object
    })

    //定义数据
    const state = reactive({
        navSelect: 1,
        imgItemConfig:{
            leftImg: 'ai-alarm.png',
            botImg: 'ai-alarm-val.png',
            msg: alarmNav[0].title,
            val: alarmNav[0].key
        },
        infoList: alarmNav[0].list
    })


    //把接口的数据添加到数组里
    const pushArrVal= arr => arr.map(item => ({...item, val: props.data[item.key]}))
    

    const alarmItemClick = obj => {
        console.log(obj)
        state.navSelect = obj.id
        state.imgItemConfig.msg = obj.title
        state.imgItemConfig.val = obj.key
        state.infoList = obj.list
    }

</script>

<template>
    <div class = 'RightCom'>
        <Container :config = 'rightLay[0]'>
            <div class = 'RightComTop'>
                <HighChart :id = '`rightAlarmChart`' :option.sync = 'alarmChart_option(pushArrVal([]))'/>
            </div>
            <div class = 'RightComBot'>
                <div class = 'RightComBotLine'>
                    <img src="../assets/kaisheng/decorative03.png" alt="">
                    <img src="../assets/kaisheng/decorative04.png" alt="">
                </div>
                <div class = 'RightComBotNav'>
                    <div class = 'RightComBotNavItem' v-for = 'item in alarmNav' :key="item.id" @click="alarmItemClick(item)">
                        <div class = 'RightComBotNavItemT' >
                            <img v-show = 'state.navSelect == item.id' src="../assets/kaisheng/active-line.png" alt="">
                        </div>
                        <div :class = '{ RightComBotNavItemSe: state.navSelect == item.id}'>{{item.name}}</div>
                        <!-- <img :src="formanSrc(`${imgPat}${ state.navSelect == item.id? 'decorative05.png': 'decorative06.png'}`)" alt=""> -->
                        <img :src="getSrc(state.navSelect == item.id? 'decorative05.png': 'decorative06.png', 'kaisheng')" alt="">
                    </div>
                </div>
                <div class = 'RightComIcon'>
                    <ImgItem :config="state.imgItemConfig"/>
                </div>
                <div class = 'RightComList'>
                    <div class = 'RightComListItem' v-for = 'item in state.infoList' :key="item.id">
                        <div class = 'RightComListItemT' v-show = 'item.key'>{{item.key}}</div>
                        <div class = 'RightComListItemB' v-show = 'item.name'>{{item.name}}</div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
</template>

<style scoped>
.RightCom{
    width: 21%;
    max-width: 404px;
    min-width: 326px;
    /* height: calc( 100% - 350px ); */
    /* height: 67.4%; */
    height: calc( 100% - 21.67% - 105px );
    max-height: 730px;
    position: absolute;
    top: 86px;
    right: 15px;
    pointer-events: auto;
}
.RightComTop{
    height: 28%;
}
.RightComBot{
    height: calc( 100% - 28% - 36px );
    border-top: 1px solid  rgba(255,255,255,0.08);
    position: relative;
    padding: 10px;
    padding-top: 0;
    box-sizing: border-box;

}

.RightComBotLine{
    width: calc( 100% - 20px );
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
}

.RightComBotNav{
    display: flex;
    justify-content: center;
}

.RightComBotNavItem{
    position: relative;
    top: -5px;
    margin: 0 5px;
    color: rgb(116, 141, 160);
    cursor: pointer;
}
.RightComBotNavItemT{
    height: 18px;
}


.RightComBotNavItemSe{
    color: #1CF0FE;
}


.RightComIcon{
    height: 32%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
}

.RightComList{
    height: calc( 100% - 32% - 54px );
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
}

.RightComListItem{
    min-width: 20%;
    font-family: ShangShouRuiLengTi2;
    font-size: 22px;
    color: #EDF8FF;
    margin: 0 5px;
}

.RightComListItemB{
    padding: 0 9px;
    height: 22px;
    line-height: 22px;
    background-image: url('../assets/kaisheng/screen-fx-IV.png');
    background-size:100% 100%;
    color: rgb(116, 141, 160);
    font-size: 12px;
}

</style>
