import { Vector3 } from 'three'
import { createLabelGroup, createLabelByPos, removeLabel, createLogoElement } from './labelManager'
// import { companyList } from '../resource/surveyRe'
// import { TweenMax } from 'gsap'
// import { getLoc } from '../interface'
let companyList = [
    {
        id:1,
        pos: {
            "x": 400.2771062492168,
            "y": 0.00661660288576791,
            "z": 453.59798603947166
        }
    },
    {
        id:2,
        pos: {
            "x": 302.07544308801823,
            "y": 0.006622586612682154,
            "z": 364.33417114771726
        }
    },
    {
        id:3,
        pos: {
            "x": 468.34677385596535,
            "y": 5.615073837404625,
            "z": 289.97792286948686
        }
    },
    {
        id:4,
        pos: {
            "x": 167.75438633646968,
            "y": 0.006628909162924581,
            "z": 306.68231669253566
        }
    },
]

export default class CompanyPos {
    
    constructor(){
        this.facade = null
        // this.peoplePositionMap = new Map;
        // this.personCount = 0
        // this.timer = null
        this.companyGroup = null
        // this.hasClose = false           //已经关闭,处理调接口异步后仍会触发一次
    }

    init(facade){
        this.facade = facade
        this.companyGroup = createLabelGroup('companyGroup', facade.scene)
    }

    showComSigns(clickFn){
        
        companyList.map((item, index) => {
            let pos = new Vector3(item.pos.x, item.pos.y, item.pos.z);
            // console.log(pos)
            let logo = createLogoElement('src/assets/kaisheng/icon-ld.png',`company_${item.id}`,clickFn);
            
            logo.info = item;
            // let obj = createLabelByPos(logo,pos,`company_${item.id}`);

            let obj = createLabelByPos(this.facade.scene, this.companyGroup, logo, pos)

            // if(obj){
            //     this.VideoLabelGroup.add(obj);
            // }
        })
    }

    createLogoElement(){

    }

    
}