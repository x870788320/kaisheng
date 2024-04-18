<script setup>
    import { reactive, onUnmounted } from 'vue'
    import { getWeather } from '../Utils/map';
    import { formatDate, getSrc } from '../Utils'

    //接收的参数
    defineProps({
        msg: String
    })

    //定义数据
    const state = reactive({
        weaImg: 'sunny.svg',
        weaTem: '',
        time:''
    })

    const weaToImg = {
        fog: ['雾'],
        snow: ['雪'],
        bRain: ['大雨'],
        sRain: ['小雨', '雨'],
        wind: ['风'],
        cloud: ['云','阴'],
        sunny: ['晴'],
    }

    const weatherInit = async () => {
        const weather = await getWeather().then(r => r).catch(e => e)
        const { type, tem } = weather
        let imgSrc = 'sunny'
        state.weaTem = tem
        //遍历找出接口得到的有上面weaToImg标记的这些
        let filArr = Object.keys(weaToImg).filter(item => weaToImg[item].some(wea => type.includes(wea)))
        if(filArr || filArr.length){
            imgSrc = filArr[0]
        }
        // state.weaImg = new URL(`../assets/weather/${imgSrc}.svg`, import.meta.url).href
        state.weaImg = `${imgSrc}.svg`
    }
    
    weatherInit()

    const timeInit = setInterval(() => (state.time = formatDate()),1000)
        
    onUnmounted(()=> clearInterval(timeInit))
    

</script>

<template>
    <div class = 'headerTop'>
        <div class = 'headerTopLeft overflow'>
            <!-- <img :src="state.weaImg" alt=""> -->
            <img :src="getSrc(state.weaImg, 'weather')" alt="">
            <div>{{state.weaTem}}</div>
        </div>
        <div>
            <img src="../assets/kaisheng/name.png" alt="">
        </div>
        <div class = 'headerTopRight overflow'>
            <span>{{state.time[1]}}</span>
            <span>{{state.time[2]}}</span>
            <span>{{state.time[3]}}</span>
        </div>
    </div>
    <div class = 'headerBot'>
        <img src="../assets/kaisheng/decorative01.png" alt="">
        <img src="../assets/kaisheng/decorative02.png" alt="">
    </div>
</template>

<style scoped>
.headerTop{
    height: 77px;
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    line-height: 77px;
    font-weight: 600;
    position: relative;
}

.headerTopLeft{
    display: flex;
}


.headerTopLeft img{
    width: 32px;
    margin-right: 15px;
}
.headerBot{
    height: 3px;
}

.headerTopRight>span:nth-child(2){
    margin: 0 15px;
}

.headerBot{
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin-top: -6px;
}

</style>
