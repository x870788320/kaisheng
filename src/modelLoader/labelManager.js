import { Group, Box3 } from 'three'
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';


//模型添加一层显示定位的浮层
export const initLabelRenderer = params => {
    let labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(params.width, params.height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.zIndex = 98; // 调整图标的z-index，实现在drawer打开的时候图标是否可以再点击
    labelRenderer.domElement.style.pointerEvents = 'none';   //所有子组件需要加上 pointerEvents = 'auto'
    labelRenderer.domElement.className = 'icons';
    params.container.appendChild(labelRenderer.domElement);
    return labelRenderer
}

//创建一个组
export const createLabelGroup = (name, scene) => {
    let labelGroup = new Group();
    labelGroup.name = name;
    labelGroup.visible = true;
    scene.add(labelGroup);
    return labelGroup
}


//给组中添加数据
export const createLabelByPos = (scene, group, dom,pos,visible = true) => {
    let labelObject = new CSS2DObject(dom);
    scene.updateMatrixWorld(true);
    labelObject.visible = visible;
    labelObject.position.set(pos.x,pos.y,pos.z);
    // console.log(labelObject)
    group.add(labelObject);
    // console.log(group)
    return labelObject
}


//创建一个icon标签
// export const createLogoElement = (src,id,onClick,style) => {
//     const { width, height } = { ...style, ...{ width: 20, height: 20 }}
//     let iconDom = document.createElement('div');
//     iconDom.className = 'imgicon';
//     iconDom.style.background = `url(${src})`;
//     iconDom.style.backgroundSize = `100% 100%`;
//     iconDom.style.marginTop = `-${ width / 2 }px`
//     iconDom.style.width  = `${ width }px`;
//     iconDom.style.height = `${ height }px`;
//     iconDom.style.pointerEvents = 'auto';
//     // iconDom.style.cursor = 'pointer';
//     iconDom.onclick = onClick;
//     iconDom.id = id;
//     return iconDom;
// }


//创建一个icon标签
export const createLogoElement = (src,id,onClick,style) => {
    console.log(src)
    const { width, height } = { ...style, ...{ width: 20, height: 20 }}
    let iconDom = document.createElement('div');
    iconDom.className = 'imgicon';
    iconDom.style.marginTop = `-${ width / 2 }px`
    iconDom.style.width  = `${ width }px`;
    iconDom.style.height = `${ height }px`;
    iconDom.style.pointerEvents = 'auto';
    iconDom.onclick = onClick;
    iconDom.id = id;


    //下面的图片
    let imgDom = document.createElement('img');
    //imgDom.src = 'http://119.167.68.82:50011/fileStatic/init/%E8%93%9D%E5%B8%BD.png'
    imgDom.src = src
    imgDom.style.width = '100%'
    imgDom.style.height = '100%'
    imgDom.style.margin = '0 auto'

    iconDom.appendChild(imgDom);
    return iconDom;
}

export const removeLabel = (Group, obj) => Group.remove(obj)

export const removeAllLabels = Group => Group.clear();







// export default class LabelManager{
//     constructor(facade){
//         this.facade = facade;
//         this.labelGroup = new Group();
//         this.labelGroup.name = "labelGroup";
//         this.labelGroup.visible = true;
//         this.labelRenderer = null

//         // this.tmpGroup = new Group();
//         // this.tmpGroup.visible = true;
//     }

//     init(params){
//         // this.labelRenderer = new CSS2DRenderer();
//         // this.labelRenderer.setSize(params.width, params.height);
//         // this.labelRenderer.domElement.style.position = 'absolute';
//         // this.labelRenderer.domElement.style.top = '0px';
//         // this.labelRenderer.domElement.style.zIndex = 98; // 调整图标的z-index，实现在drawer打开的时候图标是否可以再点击
//         // this.labelRenderer.domElement.className = 'icons';
//         // params.container.appendChild(this.labelRenderer.domElement);
//         this.facade.scene.add(this.labelGroup);
//         // this.facade.scene.add(this.tmpGroup);
//     }



//     createLabelByNode(node,dom,tag,visible = true){
//         if(!node){
//             return;
//         }

//         tag = tag || '';

//         let labelName = tag+"_"+node.name;
//         let labelObject = this.labelGroup.getObjectByName(labelName);
//         if(!labelObject)
//         {
//             labelObject  = new CSS2DObject(dom);
//         }

//         this.facade.scene.updateMatrixWorld(true);
//         var bbox = new Box3().setFromObject(node);
//         let center = bbox.getCenter();
//         center.y = bbox.max.y;
//         labelObject.name = tag+"_"+node.name;
//         labelObject.visible = visible;
//         labelObject.position.set(center.x,center.y,center.z);
//         this.labelGroup.add(labelObject);
//     }

//     createLabelByPos(dom,pos,visible = true){

//         let labelObject = new CSS2DObject(dom);
//         this.facade.scene.updateMatrixWorld(true);
//         labelObject.visible = visible;
//         labelObject.position.set(pos.x,pos.y,pos.z);
//         // console.log(labelObject)
//         this.labelGroup.add(labelObject);
//         return labelObject
//     }

    
//     createLabelByPos2(dom,pos,visible = true){
//         let labelObject = new CSS2DObject(dom);
//         this.facade.scene.updateMatrixWorld(true);
//         labelObject.visible = visible;
//         labelObject.position.set(pos.x,pos.y,pos.z);
//         return labelObject
//     }

//     createTempLabelByNode(node,dom,tag,visible = true){
//         if(!node){
//             return;
//         }

//         let labelName = tag+"_"+node.name;
//         let labelObject = this.tmpGroup.getObjectByName(labelName);
//         if(!labelObject)
//         {
//             labelObject  = new CSS2DObject(dom);
//         }

//         this.facade.scene.updateMatrixWorld(true);
//         var bbox = new Box3().setFromObject(node);
//         let center = bbox.getCenter();
//         center.y = bbox.max.y;
//         labelObject.visible = visible;
//         labelObject.position.set(center.x,center.y,center.z);
//         this.tmpGroup.add(labelObject);
//     }

//     createTempLabelByPos(dom,pos,visible = true){
//         let labelObject = new CSS2DObject(dom);
//         //this.facade.scene.updateMatrixWorld(true);
//         labelObject.visible = visible;
//         labelObject.position.set(pos.x,pos.y,pos.z);
//         this.tmpGroup.add(labelObject);
//         return labelObject
//     }

//     showLabelByTag(tag,visible){
//         this.labelGroup.traverse(function(obj) {
//             if(obj.name.startsWith(tag))
//             {
//                 obj.visible = visible;
//             }
//           });
//     }

//     removeLabel(obj){
//         this.labelGroup.remove(obj)
//     }

//     removeAllLabels(){
//         this.labelGroup.clear();
//     }

//     removeAllTempLabels(){
//         this.tmpGroup.clear();
//     }
// }

