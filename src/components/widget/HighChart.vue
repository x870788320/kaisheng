<script setup>
    import { reactive, watch, onMounted, nextTick  } from 'vue'
    import highcharts from 'highcharts'
    import highcharts3d from 'highcharts/highcharts-3d'

    //接收的参数
    const props = defineProps({
        option: Object,
        id: String
    })

    const state = reactive({
        hasMount: false    
    })

    const init = has => {
        if( !props.id || !props.option ) {
            console.log('err', '注意参数参数！')
            return
        }
        //减少刚开始meiyou dom时的监听渲染
        //好好缕缕
        state.hasMount = has || state.hasMount
        if(!state.hasMount) return

        //有dom时执行
        nextTick(() => {
            highcharts3d(highcharts)
            highcharts.chart(props.id, props.option)
        })
    }

    // 监听option
    watch(
        () => props.option,
        () => init(),
        {
            immediate: true, // 立即执行
            deep: true // 深度监听
        }
    )

    onMounted(() => init(true))
    

</script>

<template>
    <div class = 'chart_bar' :id="id"></div>
</template>

<style scoped>
.chart_bar{
    width: 100%;
    height: 100%;
}

</style>
