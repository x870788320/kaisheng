
//配置项默认值
export const defaultFacadePayload = {
    container : null,                      // 容器dom
    devicePixelRatio: window.devicePixelRatio,   //像素比
    width: window.innerWidth,                   // 屏幕大小 
    height: window.innerHeight
} 


//相机的初始化数据参数
export const cameraDef = {
    perspectiveCfg:{
        range: 60,
        near: 10,
        far: 100000
    },
    cameraP: {
        "x": 65.41407103990316,
        "y": 230.64630751861625,
        "z": 281.6264000674835
    },
    lookP: {
        "x": 58.873459923325996,
        "y": -76.00988032680624,
        "z": -7.67080652403127
    },
 }


//模型定位 时的三点位置
export const pointPosition = {
    yuandian:{lon:118.0211875894,lat:36.6903749958},
    east:{lon:118.0247674255,lat:36.6903749958},
    north:{lon:118.0211875894,lat:36.6923764457},
}
