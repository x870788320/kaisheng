<script setup>
    import { reactive, defineEmits } from 'vue'

    //定义数据
    const state = reactive({
        curTitle: 1
    })

    //接收的参数
    defineProps({
        config: Object
    })

    
    const emit = defineEmits(['containerTabClick'])

    const titleClick = (id, isSe) => {
        if(!isSe) return 
        state.curTitle = id
        emit('containerTabClick', id)
    }

</script>

<template>
    <div class = 'container'>
        <div class = 'containerTitle'>
            <div class = 'containerTitleLeft'><img src="../assets/kaisheng/title-bg-arrow.png" alt=""></div>
            <div class = 'containerTitleRight'>
                <div class = 'containerTitleL1'></div>
                <div class = 'containerTitleL2'></div>
                <div class = 'containerTitleL3'></div>
            </div>
            <div class = 'containerTitleCon overflow'>
                <span :class = '{containerTitleSe: state.curTitle == 1, containerTitleNSe: config.firTitle}' 
                    v-if = 'config.firTitle'
                    @click="titleClick(1, config.firTitle)">
                    {{config.firTitle}}
                </span>
                <span @click="titleClick(2, config.firTitle)"
                     :class = '{containerTitleSe: state.curTitle == 2, containerTitleNSe: config.firTitle}' >
                    {{config.title}}
                </span>
                <span class = 'containerTitleMsg' v-if = 'config.subtitle'>{{config.subtitle}}</span>
            </div>
        </div>
        <slot></slot>

        <!-- <div class = 'containerCon'>
            <slot></slot>
        </div> -->
       
    </div>
</template>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    border-top: 2px solid;
    border-image: linear-gradient(90deg, #3B95FF 0%, rgba(59,149,255,0.00) 100%) 2 2 2 2; 
    background: rgba(4,24,49,0.55);
    padding-top: 10px;
    box-sizing: border-box;
}

.containerTitle{
    /* height: 32px; */
    height: 26px;
    display: flex;
    position: relative;
    padding-right: 15px;
    box-sizing: border-box;
}

.containerTitleLeft{
    /* width: 104px; */
    height: 100%;
}

.containerTitleLeft>img{
    height: 100%;
}
.containerTitleRight{
    flex: 1;
    display: flex;
    align-items: center;
}
.containerTitleL1{
    height: 2px;
    flex:1;
    background-image: linear-gradient(270deg, rgba(59,149,255,0.12) 0%, rgba(59,149,255,0.00) 100%);
}

.containerTitleL2{
    width: 16px;
    height: 2px;
    background: rgba(59,149,255,0.44);
    margin: 0 4px;
}
.containerTitleL3{
    width: 16px;
    height: 2px;
    background: #3B95FF;
}

.containerTitleCon{
    width: calc( 100% - 76px );
    /* height: 32px;
    line-height: 32px; */
    height: 26px;
    line-height: 26px;
    position: absolute;
    top: 0;
    left: 38px;
    /* font-size: 18px; */
    font-size: 16px;
    font-weight: 700;
}

.containerTitleMsg{
    font-size: 12px;
    color: rgba(173,202,221,0.33);
    font-weight: 400;
    margin-left: 15px;
}

.containerTitleCon>span:nth-child(1){
    margin-right: 20px;
}

.containerTitleSe{
    color: #1CF0FE;
}
.containerTitleNSe{
    cursor: pointer;
}

</style>
