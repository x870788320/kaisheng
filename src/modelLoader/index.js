// import * as THREE from 'three'

import { Scene, Clock, LoadingManager, Raycaster, MeshBasicMaterial, Box3, Vector3 } from 'three'

//模型加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

//three 初始化数据
import { initRenderer, initDefaultLighting, initCamera, initStats, initControls, initPMREM } from './threePrepare'
//three 标签初始化
import { initLabelRenderer } from './labelManager'
//three 人员定位
import PerSonPosition from './threePerPosition'
import Business from './threeBusiness'





import { defaultFacadePayload, pointPosition } from './threeResource'

//不变色的建筑
const noColors = [
    '网格118',
    'zilaishuichi',
    '网格203',
    '网格126',
    '网格138',
    '网格240',
    '网格227',
    '网格299'
]

var rayCaster   = new Raycaster();

export default class Facade{
    constructor(){
        this.stats = null                               //性能监测
        this.scene = null                               //场景
        this.camera = null                              //相机
        this.renderer = null                            //渲染器
        this.clock = null                               //时间  
        this.controls = null                            //控制器
        this.cameralResetData = null                    //保存相机初始数据
        this.labelRenderer = null                       //模型中标签
        this.PerSonPosition = new PerSonPosition(this)
        this.Business = new Business(this)
        this.peopleHasMove = false                      //表示人员正在运动   防止暴力点击
    }

    init(payload, cameraCfg){
        const { container, devicePixelRatio, width,height } = { ...defaultFacadePayload, ...payload }
        //FPS MS MB
        // this.stats = initStats();
        //场景
        this.scene = new Scene()
        //用于跟踪时间的对象。如果性能可用
        this.clock = new Clock;
        this.camera = initCamera({ width, height, cameraCfg})
        this.renderer = initRenderer({ width, height, container })

        // 环境光、光源  //放到加载模型后触发
        // initDefaultLighting(this.scene)

        //控制器
        this.controls = initControls(this.camera, this.renderer.domElement, cameraCfg)

        //纹理
        initPMREM(this.scene, this.renderer)

        //模型标签初始化
        this.labelRenderer = initLabelRenderer({ width, height, container })

        //人员定位初始化
        this.PerSonPosition.init(this)

        //业务模块初始化
        this.Business.init(this)

        //窗口大小变化监听
        window.addEventListener('resize',() => {
            let w = window.innerWidth 
            let h = window.innerHeight
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w,h)
            if(this.labelRenderer) this.labelRenderer.setSize(w, h);
        },false);

        window.addEventListener('dblclick', event => {
            //相机与控制器目标位置
            console.log('camera.position----',this.camera.position);
            console.log('controls.target----',this.controls.target);
            
            let mouse = {}
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            rayCaster.setFromCamera(mouse, this.camera);
            var intersects = rayCaster.intersectObjects(this.scene.children, true);

            //点击位置的信息
            if (intersects.length > 0) {
                var object = intersects[0].object;
                var point  = intersects[0].point;

                console.log("=====position=====",point);
                console.log("=====object=====",object.name);
                console.log("=====object parent=====",object.parent.name);
                // console.log("=====object=====",object.parent.parent.name);
                // this.setObjColor(object,0xFF0000);
            }
        });
    }

    //开始动
    updateView(){
        const { stats, controls, renderer, scene, camera } = this
        if (stats) stats.update();
        if (controls) this.controls.update();
        if (renderer) this.renderer.render(scene, camera);
        if (this.labelRenderer) {
            this.labelRenderer.render(scene, camera);
        }
    }

    //加载模型 
    loadModels(srcs, onModelLoad){
        if(!srcs) return
        //模型加载管理器， 可以获取到加载进度
        let manager = new LoadingManager();
        // 模型加载器
        let gltfLoader  = new GLTFLoader(manager);
        //用于处理压缩的文件
        let dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./gltfdraco/');
        gltfLoader.setDRACOLoader(dracoLoader);

        manager.onLoad = onModelLoad;
        srcs.map( item => {
            gltfLoader.load(item, gltf => {
                this.scene.add(gltf.scene);
                //获取场景
                const scene = gltf.scene;
                //获取某个模型
                const mesh = scene.children[ 0 ];
                //获取到模型上的数据
                const fooExtension = mesh.userData;
                //获取模型上的信息
                console.log('模型信息', fooExtension)

                // 环境光、光源
                initDefaultLighting(this.scene)

                //模型阴影
                gltf.scene.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        child.frustumCulled = false;
                        child.castShadow = true;
                        child.receiveShadow = true
                        //模型自发光
                        //child.material.emissive =  child.material.color;
                        //child.material.emissiveMap = child.material.map ;
                    }
                  });
            });
        })
    }

    //观看视角
    lookAt(target){
        this.controls.target = target;
    }

    // 保存模型初始状态
    saveObjState(){
        //相机的初始位置,用于重置
        this.cameralResetData = {
            VecCameraP: this.camera.position.clone(), //摄像机原始位置,
            VecLookP: this.controls.target.clone() //目标向量,
        } 
        //模型的初始颜色
        this.scene.traverse(obj=>{
            if(obj.material){
                if(!obj.oldMaterial){
                    obj.oldMaterial = {
                        color: obj.material.color,
                        map: obj.material.map
                    };
                }
            }
        });
    }

    //模型复位
    reset(){
        console.log('reset')
        const { VecCameraP, VecLookP } = this.cameralResetData
        this.controls.target = VecLookP;
        this.camera.position.set( VecCameraP.x, VecCameraP.y, VecCameraP.z );
    }

    //模型设置颜色
    setObjColor(obj,color,isAll){
        if(!obj) return;
        if(obj.type === 'Group' || obj.type === 'Object3D' || obj.type === 'Scene'){
            obj.children.forEach(child => {
                this.setObjColor(child,color,isAll);
            });
            return;
        }

        if(obj.type === 'Mesh'){
            // 重置模型颜色
            obj.material = new MeshBasicMaterial();
            let newMaterial = obj.material;
            newMaterial.color.set(color);
            newMaterial.transparent = true;
            newMaterial.opacity = 0.85;
            newMaterial.needsUpdate = true;
            //某几个建筑不变色
            if(isAll){
                noColors.map(item => {
                    if(obj.name.includes(item)){
                        // 重置模型颜色
                        obj.material.color = obj.oldMaterial.color;
                        obj.material.map = obj.oldMaterial.map;
                        obj.material.opacity = 1.0;
                        obj.material.needsUpdate = true;
                    }
                })
            }
        }
    }

    //得到模型中心位置
    getNodeCenter(node){
        var bbox = new Box3().setFromObject(node);
        let objCenter = new Vector3(0,0,0);
        bbox.getCenter(objCenter);
        return objCenter;
    }

    //经纬度转换坐标
    convertCoord(lonLat){
        let lon = lonLat.lon;
        let lat = lonLat.lat;

        if(!this.lon2CxRadio){
            try {
                if( !pointPosition ){
                    throw new Error('pointPosition is not defined!')
                }
            } catch (e) { console.log(e) } 

            let arr = Object.keys(pointPosition)
            let yuandianNode = this.scene.getObjectByName(arr[0])
            let eastNode = this.scene.getObjectByName(arr[1])
            let northNode = this.scene.getObjectByName(arr[2])

            console.log('eastNode',eastNode);

            this.eastPos = this.getNodeCenter(eastNode);
            this.northPos = this.getNodeCenter(northNode);
            this.yuandianPos = this.getNodeCenter(yuandianNode);
            this.originGis = pointPosition[arr[0]];

            this.norVec = this.northPos.clone();
            this.norVec.sub(this.yuandianPos);
    
            this.eastVec = this.eastPos.clone();
            this.eastVec.sub(this.yuandianPos);
    
            this.norVec.normalize();
            this.eastVec.normalize();

            var cx = this.eastPos.clone().sub(this.yuandianPos).length();
            let eastDis = pointPosition[arr[1]].lon - pointPosition[arr[0]].lon
            this.lon2CxRadio = cx / eastDis;

            var cz = this.northPos.clone().sub(this.yuandianPos).length();
            let northDis = pointPosition[arr[2]].lat - pointPosition[arr[0]].lat
            this.lat2CzRadio =cz / northDis;
        }
        let tempLonDis = lon - this.originGis.lon;
        let tempLatDis = lat - this.originGis.lat;

        var xDis = tempLonDis * this.lon2CxRadio;
        var zDis = tempLatDis * this.lat2CzRadio;

        let eastDisVec = this.eastVec.clone();
        let norDisVec = this.norVec.clone();

        eastDisVec.x = eastDisVec.x * xDis;
        eastDisVec.y = eastDisVec.y * xDis;
        eastDisVec.z = eastDisVec.z * xDis;
        norDisVec.x = norDisVec.x * zDis;
        norDisVec.y = norDisVec.y * zDis;
        norDisVec.z = norDisVec.z * zDis;

        let point = this.yuandianPos.clone();
        point.add(eastDisVec);
        point.add(norDisVec);

        return point;
    }

    //比率转为pos
    ratio2Pos(picturePt){
        if(!this.picPt2CxRadio){
            // let xObj = this.scene.getObjectByName("c")
            // let yObj = this.scene.getObjectByName("b")
            // let oObj = this.scene.getObjectByName("a")
            let xObj = this.scene.getObjectByName("b")
            let yObj = this.scene.getObjectByName("c")
            let oObj = this.scene.getObjectByName("a")


            this.picX = this.getNodeCenter(xObj);
            this.picY = this.getNodeCenter(yObj);
            this.picOrigin = this.getNodeCenter(oObj);

            this.xVec = this.picX.clone();
            this.xVec.sub(this.picOrigin);
    
            this.yVec = this.picY.clone();
            this.yVec.sub(this.picOrigin);
    
            this.xVec.normalize();
            this.yVec.normalize();

            this.pic2CxRadio = this.picX.clone().sub(this.picOrigin).length();
            this.pic2CyRadio = this.picY.clone().sub(this.picOrigin).length();
        }

        console.log(this.pic2CxRadio)


        var xDis = picturePt.x * this.pic2CxRadio;
        // var yDis = picturePt.y * this.pic2CyRadio;
        // var xDis = (1 - picturePt.x) * this.pic2CxRadio;
        var yDis = (1 - picturePt.y) * this.pic2CyRadio;
        // console.log(xDis)

        // console.log('pic2CxRadio',this.pic2CxRadio);
        // console.log('pic2CyRadio',this.pic2CyRadio);

        // console.log('xDis',xDis);
        // console.log('xDis',xDis);


        let xDisVec = this.xVec.clone();
        let yDisVec = this.yVec.clone();

        xDisVec.x = xDisVec.x * xDis;
        xDisVec.y = xDisVec.y * xDis;
        xDisVec.z = xDisVec.z * xDis;
        yDisVec.x = yDisVec.x * yDis;
        yDisVec.y = yDisVec.y * yDis;
        yDisVec.z = yDisVec.z * yDis;

        let point = this.picOrigin.clone();
        point.add(xDisVec);
        point.add(yDisVec);

        return point;
    }


    //开始人员定位
    startPerMove(onClick, callback){
        //防止暴力点击
        if(!this.peopleHasMove){
            this.PerSonPosition.hasClose = false
            this.PerSonPosition.startPerMove(onClick, callback)
            this.peopleHasMove = true
        }
    }

    // 停止人员定位
    stopPerMove(){
        this.PerSonPosition.stopPerMove()
        this.peopleHasMove = false
    }


    
    //业务模块显示
    //风险一张图
    showRiskColors(){
        const colorNames = ['red','orange','yellow','blue']
        const colors = [0xFF0000,0xFF7F00,0xFFFF00,0x031B69]
        colorNames.map((item,i) => {
            let redObj = this.scene.getObjectByName(item);
            if(redObj){
                this.setObjColor(redObj,colors[i], true);
            }
        })

        //几个特殊情况
        
        let Obj1 = this.scene.getObjectByName('polySurface1451');
        this.setObjColor(Obj1,0xFF0000);
        
        let Obj2 = this.scene.getObjectByName('raoreyoulu');
        this.setObjColor(Obj2,0x031B69);
        
        let Obj3 = this.scene.getObjectByName('sanhaozhuangzhiersansicengfanyingfu');
        this.setObjColor(Obj3,0x031B69);
        
        let Obj4 = this.scene.getObjectByName('zhimaiyeliuxiang');
        this.setObjColor(Obj4,0x031B69);
        
        let Obj5 = this.scene.getObjectByName('lvhuayafengk102chejian3haozhuangzhi');
        this.setObjColor(Obj5,0xFF0000);

        let Obj6 = this.scene.getObjectByName('beicefanyingfu');
        this.setObjColor(Obj6,0x031B69);
        
    }

    hideRiskColors(){
        this.scene.traverse(obj=>{
            // 重置模型颜色
            if(obj.oldMaterial){
                obj.material.color = obj.oldMaterial.color;
                obj.material.map = obj.oldMaterial.map;
                obj.material.opacity = 1.0;
                obj.material.needsUpdate = true;
            }
        });
    }

    //重大危险源
    showDangenLebal(fn){
        return  this.Business.showDangerSigns(fn)
    }
    hideDangenLebal(){
        return  this.Business.hideDangerSigns()
    }
    //特殊作业
    showWorkLebal(fn, data){
        console.log(data)
        return  this.Business.showWorkLebal(fn, data)
        
    }
    hideWorkLebal(){
        return  this.Business.hideWorkLebal()
    }

}