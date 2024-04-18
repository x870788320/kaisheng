<script setup>
  import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
  import Axios from 'axios'
  import * as THREE from 'three'
  import WebGL from 'three/examples/jsm/capabilities/WebGL';

  //数据
  import { getRiskData, getGDSData } from '../interface'
  import { mockStatics } from '../resource/mockStatics'
  import { homeBtns } from '../resource/homeRe'
  import { gdsInfo } from '../resource/gdsResource'

  //方法
  import { formatDate } from '../Utils'
  
  //组件
  import Header from "../components/Header.vue"
  import LeftCom from "../components/LeftCom.vue"
  import RightCom from "../components/RightCom.vue"
  import BottomCom from "../components/BottomCom.vue"
  
  //三维
  import Facade from '../modelLoader'

  //state 数据
  const state = reactive({
    allData: mockStatics,
    dangerWarnData: [],
    cenBtnId: 0,
    gdsData:[],
    timer60: null,
    personCount: {}
  })

  //初始化三维数据
  const facade = new Facade()

  //模型显示的相机位置
  const camPos = {
      "x": 352.8354357292584,
      "y": 226.65440190489463,
      "z": 636.7376305919063
  }
  //模型的照射位置
  const focuPos = {
      "x": 351.9803517289691,
      "y": -43.32709353164277,
      "z": 293.0342004206688
  }

  const myPopCom = ref()
  const bottomCom = ref()

  //获取接口数据
  // getRiskData().then(res => {
  Axios.get('https://222.173.243.142:7788/public/screen/getStatics').then(r => {
    // console.log(res)
    let res = r.data
    if(!res.success) return
    state.allData = res.t
  }).catch(e => console.log(e))

  state.timer60 = setInterval(() => {
    Axios.get('https://222.173.243.142:7788/sft/pub/data/gds/list').then(r => {
      let res = r.data
      if(!res.success) return
      state.gdsData = res.t || []
    }).catch(e => console.log(e))
  }, 1000 * 60)
  
  Axios.get('https://222.173.243.142:7788/sft/pub/data/gds/list').then(r => {
      let res = r.data
      if(!res.success) return
      state.gdsData = res.t || []
    }).catch(e => console.log(e))



  //点击事件
  const centerBtnClick = obj => {
    console.log(obj)
    //模型重置
    if(obj.fn == 'reset'){
      facade.reset()
      return
    }
    //返回后台
    if(obj.fn == 'toBack'){
      window.open('https://222.173.243.142:7788/', "_self")
      return
    }
    //人员定位
    if(obj.fn == 'toPosition'){
      window.open('http://172.168.85.53:9999/#/fromUrl?topage=bigscreennew&buildid=204359&showmenu=true&token=22D9BF4F773D73927DEB2A666CE1FA81', "_self")
      return
    }

    const CloseFns = ['hideRiskColors', 'hideDangenLebal', 'hideWorkLebal']
    CloseFns.map(item => facade[item]())
    //如果点击同一个按钮
    if(state.cenBtnId == obj.id) {
      state.cenBtnId = 0

      //显示人员定位  
      //第一个参数，人员的点击事件，第二个获取人的callback
      facade.startPerMove( e => {
        console.log(e.target.info)
      },
      info => bottomCom.value.getPersonCount(info))
      return
    }
    
    //如果点击不同按钮 标签的事件回调
    state.cenBtnId = obj.id
    facade.stopPerMove()
    facade[obj.fn](centerBtnCallback, state.allData.coords)
  }

  const centerBtnCallback = e => {
    const info = e.target.parentNode.info || e.target.info
    let clickGds = gdsInfo.filter(item => {
      if(item.t1){
        item.t = `${item.t}-item.t1`
      }
      return item.t.includes(info.title)
    })


    let clickGdsVal = state.gdsData.filter(item => {
      if(item.gdsDevice) {
        return clickGds.some(gdsIn => item.gdsDevice.addr == gdsIn.code)
      }
      return false
    })
    let vals = { ...info, ...clickGdsVal[0] }
    if(vals.gdsDevice){
      vals = { ...vals, ...vals.gdsDevice }
    }

    console.log(vals)
    
    //弹出表格数据
    let popData = {
      type: 'table',
      data: btnTableDatas(vals)
    }
    //弹出方法
    myPopCom.value.popDataInit(popData)
  }

  //2重大危险源， 3特殊作业
  const btnTableDatas = info =>  {
    if(state.cenBtnId == 2) {
      return [
        { title: '名称', val: info.title },
        { title: '类型', val: info.type },
        { title: '数值', val: info.v},
        { title: '单位', val: info.unit},
        { title: '状态', val: info.status? info.status == 1? '正常': '不正常': ''},
        { title: '时间', val: `${formatDate(info.t).slice(0,2).join('-')} ${formatDate(info.t)[3]}` },
      ]
    }
    if(state.cenBtnId == 3) {
      return [
        { title: '名称', val: info.documentTemplate.name },
        { title: '状态', val: info.status },
        { title: '内容', val: info.content },
        { title: '部门', val: info.dept.name },
        { title: '创建人', val: info.user.ushow },
        { title: '创建时间', val: formatDate(info.createTime).slice(0,2).join('-') },
      ]
    }
    return []
  }
   

  //弹窗的关闭事件
  const popClose = () => {
    console.log('popColsed')
  }

  //加载三维
  const modelInit = () => {
      const container = document.getElementById('modelContainer')
      facade.init({ container })
      let models = [ 'static/models/kaisheng/kaisheng.glb' ]
      facade.loadModels(models,() => {
        //所有加载器加载完成后，将调用此函数
        console.log('onLoad')
        
        facade.camera.position.set(camPos.x, camPos.y, camPos.z);
        let focusPt = new THREE.Vector3(focuPos.x, focuPos.y, focuPos.z);
        facade.lookAt(focusPt)
        facade.camera.updateProjectionMatrix();

        //保存模型初始状态
        facade.saveObjState();

        //显示人员定位  
        //第一个参数，人员的点击事件，第二个获取人的callback
        facade.startPerMove( e => {
          console.log(e.target.info)
        },
        info => bottomCom.value.getPersonCount(info))
      })
  }


  //模型可操作
  const modelAnimate = () => {
    let delta = facade.clock.getDelta();
    facade.controls.update(delta);
    requestAnimationFrame(modelAnimate);
    facade.updateView();
  }

  
  onMounted(() => {
    if ( WebGL.isWebGLAvailable() ) {
        console.log('SUPPORT WEBGL!')
        modelInit()
        modelAnimate()
    } else {
        console.log('NOT SUPPORT WEBGL!')
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById('modelContainer').appendChild( warning );
    }
  })
  onBeforeUnmount(() => {
    clearInterval(state.timer60)
  })
</script>

<template>
  <div id="modelContainer" ref = 'modelContainer'></div>
  <MyPopCom @popClose = 'popClose' ref = 'myPopCom'/>
  <div class = 'home'>
    <Header />
    <div class = 'centerBtns'>
      <div v-for = 'item in homeBtns' 
         :class = '{centerBtnsItem: true,centerBtnsItemSe: state.cenBtnId == item.id}' 
         :key="item.id"
         @click="centerBtnClick(item)">
        {{item.title}}
      </div>
    </div>
    <LeftCom :data.sync = 'state.allData'/>
    <RightCom :data.sync = 'state.allData'/>
    <BottomCom :data.sync = 'state.allData' ref = 'bottomCom'/>
  </div>
</template>

<style scoped>
#modelContainer{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background: rgba(3, 14, 27, 1); */
  background: url('../assets/kaisheng/homebkg.jpg');
  background-size: 100% 100%;
}
.home{
  padding: 0 15px 10px;
  background: rgba(3, 14, 27, 0);
  color: #ADCADD;
  position: relative;
  z-index: 100;
  pointer-events: none;
}
.centerBtns{
  width: 55%;
  position: absolute;
  left: 0;
  right: 0;
  top: 86px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  pointer-events: auto;
}
.centerBtnsItem{
  /* width: 18%; */
  /* width: 186px; */
  width: 156px;
  height: 44px;
  line-height: 44px;
  margin: 5px 0;
  background: url('../assets/kaisheng/btnBkg.png');
  background-size: 100% 100%;
  font-size: 16px;
  color: #ADCADD;
  cursor: pointer;
}

.centerBtnsItem:hover{
  background: url('../assets/kaisheng/btnSeBkg.png');
  background-size: 100% 100%;
}
.centerBtnsItemSe{
  background: url('../assets/kaisheng/btnSeBkg.png');
  background-size: 100% 100%;
}
</style>
