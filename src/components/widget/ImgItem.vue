<script setup>
    import { reactive, onUnmounted } from 'vue'
    // import { formanSrc } from '../../Utils'
    import { getSrc } from '../../Utils'

    //接收的参数
    const props = defineProps({
        config: Object
    })


</script>

<template>
    <div class = 'imgItemFir'>
        <div class = 'imgItemFirLe'>
            <img :src="getSrc(props.config.leftImg, 'kaisheng')" alt="">
        </div>
        <div class = 'imgItemFirRe'>
            <div>{{config.val}}</div>
            <div class = 'imgItemFirMsg'>{{config.msg}}</div>
            <div  class = 'imgItemFirImg'>
                <img :src="getSrc(props.config.botImg, 'kaisheng')" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
.imgItemFir{
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.imgItemFirLe{
    /* width: 240px; */
    
    width: 60%;
    display: flex;
    justify-content: center;
}
.imgItemFirRe{
    /* width: 116px; */
    width: 40%;
    /* font-size: 32px; */
    font-size: 30px;
    font-family: ShangShouRuiLengTi2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    line-height: 36px;
    color: #EDF8FF;;
}

.imgItemFirMsg{
    line-height: 20px;
    font-size: 12px;
    color: #ADCADD;
    opacity: 0.7;
}

.imgItemFirImg{
    /* flex: 1;
    width: 100%; */
    height: calc( 100% - 60px );
    margin-top: 6px;
    display: flex;
    justify-content: center;
}


.RightComIcon .imgItemFirImg{
    margin-top: -10px;
}

.RightComIcon .imgItemFirLe{
    margin-top: 2%;
    height: 80%;
}

</style>
