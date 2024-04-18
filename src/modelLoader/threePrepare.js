
import {
    PerspectiveCamera,
    Color,
    WebGLRenderer,
    AmbientLight,
    Vector3,
    PMREMGenerator,
    UnsignedByteType,
    SpotLight,
    PCFSoftShadowMap,
    HemisphereLight,
    DirectionalLight,
    PointLight,
    MeshLambertMaterial,
    DoubleSide,
    PlaneGeometry,
    Mesh,
    SphereGeometry,
    sRGBEncoding,
    EquirectangularReflectionMapping
} from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';

import { Stats } from './Stats'

import { cameraDef } from './threeResource'


//初始化渲染器
export const initRenderer = pyload => {
    const renderer = new WebGLRenderer({antialias: true, alpha: true});
    // renderer.setClearColor(new Color(0x030E1B));
    renderer.setSize(pyload.width, pyload.height);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setClearAlpha(0);

    pyload.container.appendChild(renderer.domElement);
    return renderer
}

//初始化默认灯光
export const initDefaultLighting = scene => {
    //环境光
    scene.add(new AmbientLight(0xffffff))

    // 添加聚光灯
    // const spotLight = new SpotLight(0xffffff)
    // spotLight.position.set(0, 600, 0)
    // spotLight.castShadow = true
    //   scene.add(spotLight) // 聚光灯添加到场景中

    // const hemiLight = new HemisphereLight(0xffffff, 0x000000, 0.6);
    // hemiLight.position.set(0, 600, 0);
    // scene.add(hemiLight);

    
    let directionalLight = new DirectionalLight( 0xffffff, 3);
    // directionalLight.position.set( -500, 800, 500 );
    // directionalLight.position.set( 600, 800, 500 )
    directionalLight.position.set( 900, 900, 900 );
    directionalLight.castShadow = true; // default false
    
    directionalLight.shadow.mapSize.width = 2048;    // 定义阴影贴图的宽度和高度,必须为2的整数此幂
    directionalLight.shadow.mapSize.height = 2048;   // 较高的值会以计算时间为代价提供更好的阴影质量
    directionalLight.shadow.camera.near = 20;
    directionalLight.shadow.camera.far = 1800;

    directionalLight.shadow.camera.left = -500;
    directionalLight.shadow.camera.right = 500;
    directionalLight.shadow.camera.top = 500;
    directionalLight.shadow.camera.bottom = -500;
    scene.add( directionalLight );

    // let pointLight = new PointLight(0x666666, 3)
    // pointLight.position.set(100, 200, 100)
    // pointLight.castShadow = true;
    // scene.add(pointLight)

}

//初始化相机
export const initCamera = params => {
    // console.log('params', params)
    const { width, height, cameraCfg = {} } = params
    const { perspectiveCfg, cameraP } = { ...cameraDef, ...cameraCfg }
    // // PerspectiveCamera 透视摄像机
    let camera = new PerspectiveCamera(perspectiveCfg.range, width / height, perspectiveCfg.near, perspectiveCfg.far);
    // camera.position.set(cameraP.x, cameraP.y, cameraP.z);
    //lookat与control.tartget冲突时，以control为准
    // camera.lookAt(new THREE.Vector3(lookP.x, lookP.y, lookP.z));
    return camera;
}

//初始化控制器
export const initControls = (camera, dom, cameraCfg) => {
    //定义控制器核心    
    const { lookP } = { ...cameraDef, ...cameraCfg }
    let obtControls = new OrbitControls(camera, dom);

    // 如果使用animate方法时，将此函数删除
    // controls.addEventListener('change', render);
    //以下都是为了满足各种需求的各种控制器配置参数
    obtControls.enableDampling = true; //使动画循环使用时阻尼或自转 意思是否有惯性
    obtControls.enableZoom = true; //是否允许缩放
    obtControls.enablePan = true; //是否开启鼠标右键拖拽

    obtControls.autoRotate = false; //是否允许自动旋转
    obtControls.dampingFactor = 0.25; //动态阻尼系数：就是鼠标拖拽旋转灵敏度
    //惯性速度
    obtControls.rotateSpeed = 0.3;
    //平移速度
    obtControls.panSpeed = 0.5;
    //使用键盘时相机的平移速度。默认值为每个按键7.0像素。
    obtControls.keyPanSpeed = 7.0;	// pixels moved per arrow key push

    //垂直轨道的距离，上限。数学的范围是0。PI弧度，默认值为Math。圆周率。
    obtControls.maxPolarAngle = Math.PI / 2.2;

    obtControls.minDistance = 10; //设置相机距离原点的最近距离；
    obtControls.maxDistance = 2500; //设置相机距离原点的最远距离；

    obtControls.target = new Vector3(lookP.x, lookP.y, lookP.z);
    return obtControls
}

//添加HDR贴图
export const initPMREM = ( scene, renderer ) => {
    //创建一个新的 PMREM 生成器  从 cubeMap 环境纹理生成预过滤的 Mipmapped 辐射环境贴图 （PMREM）
    let pmremGenerator = new PMREMGenerator(renderer);
    //预编译等矩形着色器。通过在纹理的网络获取过程中调用此方法以提高并发性，可以更快地启动。
    pmremGenerator.compileEquirectangularShader();

    //用于加载二进制文件格式的(rgbe, hdr, …)的抽象类
    const rgbeLoader = new RGBELoader();
    // //资源较大，使用异步加载
    rgbeLoader.loadAsync("static/textures/pump_station_1k.hdr").then((texture) => {
        texture.mapping = EquirectangularReflectionMapping;
        //将加载的材质texture设置给背景和环境
        // scene.background = texture;
        scene.environment = texture;
    });

    //报错
    // new RGBELoader().setDataType(UnsignedByteType).load('static/textures/pump_station_1k.hdr', texture => {
    //     let envMap = pmremGenerator.fromEquirectangular(texture).texture;
    //     console.log(envMap)
    //     // console.log(pmremGenerator)
    //     pmremGenerator.dispose();
    //     // console.log(scene.environment)

    //     scene.environment = envMap;
    // });
}


//性能监测插件
export const initStats = type => {
    var panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    var stats = new Stats();

    stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    return stats;
}