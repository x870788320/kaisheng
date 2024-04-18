<script setup>
    import { reactive, onUnmounted } from 'vue'

    //定义数据
    const state = reactive({
        selectIconHide: true,
        pointInfo: {}
    })
    
    


    const selectPoint = e => {
        let OplanarImg = document.getElementById('planarImg')
        let OseIcon = document.getElementById('seIcon')
        let planarW = OplanarImg.offsetWidth
        let planarH = OplanarImg.offsetHeight
        let signX = e.offsetX
        let signY = e.offsetY

        state.pointInfo = {
            // planarW,                //平面图宽
            // planarH,                //平面图高
            // signX,       //X轴坐标
            // signY,       //Y轴坐标
            scaleX: (signX / planarW).toFixed(4),  //x轴坐标的占比
            scaleY: (signY / planarH).toFixed(4),  //Y轴坐标的占比
        }
        
        OseIcon.style.top = `${signY}px`
        OseIcon.style.left = `${signX}px`
        OseIcon.style.display = 'block'
        console.log(state.pointInfo)
        // OID.innerHTML = JSON.stringify(state.pointInfo)
    }

    
    //保存数据
    const submitData = () => {
        let str = `scalex=${state.pointInfo.scaleX}&scaley=${state.pointInfo.scaleY}`
        console.log(str)
        contact.showMsg(str);  
    }


</script>

<template>
    <div class = 'pointSelect'>
        <div class = 'selectImgCon'>
            <img id = 'planarImg' src="../assets/plane/kaisheng.png" @click="selectPoint" alt="">
            <div class = 'imgEditButtons' @click ="submitData()">确&nbsp;定</div>
            <div id ='seIcon' class = 'selectIcon'>
                <svg t="1661153670747" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5199" width="32" height="32"><path d="M511.999 959.753S176.185 585.513 176.185 400.06c0-185.448 150.362-335.815 335.814-335.815 185.456 0 335.816 150.368 335.816 335.815C847.815 585.512 512 959.753 512 959.753z m0-686.495c-70.027 0-126.805 56.779-126.805 126.805 0 70.03 56.778 126.807 126.805 126.807 70.029 0 126.806-56.777 126.806-126.807 0-70.026-56.777-126.805-126.806-126.805z" fill="#1F70C2" p-id="5200"></path></svg>
            </div>
        </div> 
    </div>
</template>

<style scoped>
    .pointSelect{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .selectImgCon{
        width: 82%;
        max-width: 680px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .selectImgCon>img{
        background-color: #555;
        width: 100%;
    }
    .imgEditButtons{
        width: 110px;
        height: 42px;
        line-height: 42px;
        background: rgb(31,112,194);
        margin: 10px auto;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        color: #fff;
        border-radius: 8px;
    }
    .imgEditButtons:hover{
        background: rgba(31,112,194, 0.8);
    }
    .selectIcon{
        width: 32px;
        height: 32px;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -96%);
        display: none;

    }
    .selectIcon>svg{
        height: 32px;
    }
</style>
