<script setup>
    import { reactive, computed, defineEmits, defineExpose } from 'vue'

    //接收的参数
    // defineProps({
    //     config: {
    //         type: Object,          // 如果可能存在多个类型，则可以写成 [String,Number]
    //         default: () => ({
    //             type: 'table'
    //         }),
    //         required: false          // 是否必传 ，在不声明为true 的情况下，所有prop 默认为非必填。
    //     }
    // })

    
    const emit = defineEmits(['popClose'])

    
    //定义数据
    const state = reactive({
        isShow: false,
        tableData: [
            {
                title: '分舒服撒',
                val: '份未发'
            }
        ],
        config: { type: 'text', val: '暂无数据' }
    })

    const contentStyle = computed(() => {
        let st = 'width: 780px'
        return st
    })


    //对外暴露方法 popDataInit
    defineExpose({ popDataInit: config => {
        console.log(config)
        state.isShow = true
        state.config = {...state.config, ...config}
        state.tableData = config.data || []
    }})

    const closeServeIframe = () => {
        state.isShow = false
        emit('popClose')
      }

    

</script>

<template>
    <div class = 'myPop'  @click.stop="closeServeIframe()" v-show = 'state.isShow'>
        <div  class = 'popContentCon' @click.stop="() => {}">
            <div class = 'myPopClose' @click="closeServeIframe">
                <svg t="1661761981368" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2366" width="16" height="16"><path d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z" p-id="2367" fill="#f5f5f5"></path></svg>
            </div>
            <div v-if = 'state.config.type == "text"' class = 'textPopDisplay'>
                {{state.config.val}}
            </div>
            <!-- 表格 -->
            <div v-if = 'state.config.type == "table"' :style="contentStyle">
                <div class = 'popTableCon'>
                    <div class = 'popTableRow'>
                        <div v-for="item in state.tableData"
                            :key="item.id"
                            style="width:50%;display:flex;">
                            <div class = 'popTablecolumn' style="width:152px;">{{item.title}}</div>
                            <div class = 'popTablecolumn'  style="flex:1;">{{item.val}}</div>
                        </div>
                        <div v-show='state.tableData.length % 2'
                            style="width:50%;display:flex;">
                            <div class = 'popTablecolumn' style="width:152px;"></div>
                            <div class = 'popTablecolumn'  style="flex:1;"></div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
    .myPop{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.2);
        z-index: 99999;
        color: #F5F5F5;
        font-size: 14px;
    }

    .popContentCon{
        background: rgba(14, 24, 45, 0.8) -webkit-radial-gradient(50% 100%,circle, rgba(10, 104, 225, 0.33) 0%, rgba(10, 104, 225, 0) 100%);
        padding: 20px;
        padding-top: 40px;
        position: relative;
        border-radius: 8px;
    }
    
    .myPopClose{
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .textPopDisplay{
        height: 2px;
        margin-top: -20px;
        min-width: 360px;
    }
    
    .popTableCon{
        position: relative;
    }
    .popTableRow{
        display: flex;
        flex-wrap: wrap;
        border-top:1px solid rgba(203, 217, 243, 0.21);
        border-left:1px solid rgba(203, 217, 243, 0.21);
    }
    .popTablecolumn{
        width: 50%;
        height: 40px;
        line-height: 40px;
        border-right: 1px solid rgba(203, 217, 243, 0.21);
        border-bottom: 1px solid rgba(203, 217, 243, 0.21);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .popTableConClose{
        top: -26px;
        right: -10px;
        background: rgba(0,0,0,0);
        color: #F5F5F5;
        cursor: pointer;
    }
</style>
