
import { Vector3 } from 'three'
import { createLabelGroup, createLabelByPos, removeLabel, createLogoElement } from './labelManager'
import { dangenGasRe, dangenFireRe } from '../resource/businessRe'
import { getSrc } from '../Utils'


export default class Business {
    constructor(){
        this.facade = null
        this.gasDangerGroup = null                          //气体报警装置
        this.FireDangerGroup = null                         //火灾报警装置
        this.workGroup = null                               //特殊作业
    }

    
    init(facade){
        this.facade = facade
        this.gasDangerGroup = createLabelGroup('gasDangerGroup', facade.scene)
        this.FireDangerGroup = createLabelGroup('FireDangerGroup', facade.scene)
        this.workGroup = createLabelGroup('workGroup', facade.scene)
    }

    

    //显示重大危险源
    showDangerSigns(clickFn){
        //气体报警装置
        dangenGasRe.map( item => {
            item.type = '有毒气体报警'
            let pos = new Vector3(item.pos.x, item.pos.y, item.pos.z);
            // let logo = createLogoElement('src/assets/kaisheng/warningSign.png',`gas_${item.id}`,clickFn);
            let logo = createLogoElement( getSrc('warningSign.png', 'kaisheng'),`gas_${item.id}`,clickFn);
            logo.info = item;
            createLabelByPos(this.facade.scene, this.gasDangerGroup, logo, pos)
        })
        //火灾报警装置
        dangenFireRe.map( item => {
            item.type = '可燃气体报警'
            let pos = new Vector3(item.pos.x, item.pos.y, item.pos.z);
            // let logo = createLogoElement('src/assets/kaisheng/warning.png',`fire_${item.id}`,clickFn);
            let logo = createLogoElement( getSrc('warning.png', 'kaisheng'),`fire_${item.id}`,clickFn);
            logo.info = item;
            createLabelByPos(this.facade.scene, this.FireDangerGroup, logo, pos)
        })
    }

    // 隐藏重大危险源
    hideDangerSigns(){
        if(this.gasDangerGroup){
            this.gasDangerGroup.clear();
        }
        if(this.FireDangerGroup){
            this.FireDangerGroup.clear();
        }
    }

    //显示特殊作业
    showWorkLebal(clickFn, data = []){
        //特殊作业数据从接口获取
        data.map( item => {
            let pos = this.facade.ratio2Pos({x:item.coordx,y:item.coordy})
            // let logo = createLogoElement('src/assets/kaisheng/tszy.png',`work_${item.id}`,clickFn);
            let logo = createLogoElement(getSrc('tszy.png', 'kaisheng'),`work_${item.id}`,clickFn);
            logo.info = item;
            createLabelByPos(this.facade.scene, this.FireDangerGroup, logo, pos)
        })
    }

    //隐藏特殊作业
    hideWorkLebal(){
        if(this.workGroup){
            this.workGroup.clear();
        }
    }
}