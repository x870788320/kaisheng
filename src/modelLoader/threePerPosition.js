
import { createLabelGroup, createLabelByPos, removeLabel } from './labelManager'
import { TweenMax } from 'gsap'
import { getLoc } from '../interface'
import { getSrc } from '../Utils'
import Axios from 'axios'

import * as THREE from 'three'


export default class PerSonPosition {
    constructor(){
        this.facade = null
        this.peoplePositionMap = new Map;
        this.personCount = 0
        this.timer = null
        this.personGroup = null
        this.hasClose = false           //已经关闭,处理调接口异步后仍会触发一次
    }

    init(facade){
        this.facade = facade
        this.personGroup = createLabelGroup('personGroup', facade.scene)

    }

    //开始移动
    async startPerMove(onClick, callback){
        // let peoplesData = await getLoc().then(res => res)
        let peoplesData = await Axios.get('https://222.173.243.142:7788/sft/pub/data/loc/data').then(res => res.data)
        
        //处理异步关闭问题
        if(this.hasClose) return
        if(peoplesData.code != 0 || !peoplesData.success) {
            console.log(333356)
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.startPerMove(onClick, callback)
            }, 1000);
            return
        }

        this.personCount++;
        let persons = peoplesData.t || []
        let personCountInfo = {
            all: persons.length,
            branchList: persons.reduce((pre, item) => {
                pre[item.department]? pre[item.department]++ : (pre[item.department] = 1)
                return pre
            }, {})

        }
        // console.log(personCountInfo)
        callback(personCountInfo)
        persons.map((item,index) => {
            let cur = this.peoplePositionMap.get(item.deviceNo);
            item.domText = `${item.empName}-${item.layer || 1}F`
            // item.deviceNo值作为唯一key
            if(cur){
                //如果楼层发生变化
                if(cur.layer != item.layer){
                    let dom = document.getElementById(`${item.deviceNo}_top`)
                    if(!dom) return
                    dom.innerHTML = `${item.domText}`
                    cur.layer = item.layer
                }
                
                this.personMove(cur, item)
            }else{
                //没有的话就创建一个
                this.createPersonDom(item, onClick)
            }
        })

        //去掉当次接口没 有的人员
        this.peoplePositionMap.forEach((value, key) => {
            if(value.counter !== this.personCount){
                this.peoplePositionMap.delete(key);
                if(value.label){
                    // console.log(value, key)
                    // console.log(this.personGroup)
                    removeLabel(this.personGroup, value.label);
                    // this.personGroup.remove(value.label)
                }

            }
        });

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.startPerMove(onClick, callback)
        }, 1200)
    }
    
    //定位移动
    personMove(cur, item){
        //把上次的运动停止
        if(cur.twee){
            cur.twee.pause();
            cur.twee = null
        }

        cur.counter = this.personCount;
        // 上次运动的位置
        let posLast = JSON.parse(JSON.stringify(cur.label.position))
        
        // cur.counter = this.peoplePositionCounter;
        //接口返回的位置
        let posNext = this.facade.convertCoord({lon:item.longitude,lat:item.latitude})
        cur.twee = new TweenMax(".newCreatedDiv", 3, {
            onUpdate:function(){
                let curMoveTime = this.time().toFixed(2) / 3;
                cur.label.position.set(
                    posLast.x + (posNext.x - posLast.x) * curMoveTime,
                    posLast.y + (posNext.y - posLast.y) * curMoveTime,
                    posLast.z + (posNext.z - posLast.z) * curMoveTime
                );
            },
        });
    }


    //创建一个人员定位
    createPersonDom(item, onClick){
        let params = {
            lon:item.longitude,
            lat:item.latitude,
        }
        //经纬度转换xyz
        let point = this.facade.convertCoord(params);

        // let logo = this.createPeopleLogoElement("/src/assets/common/worker.png",item,onClick);
        let logo = this.createPeopleLogoElement( getSrc('worker.png', 'common'),item,onClick);
        logo.info = item
        let label = createLabelByPos(this.facade.scene, this.personGroup, logo, point)

        //唯一标识  item.deviceNo   js map用法
        this.peoplePositionMap.set(item.deviceNo,{
            cardId: item.deviceNo,
            longitude:item.longitude,
            latitude:item.latitude,
            label,
            counter:this.personCount,
            twee:null,
            layer: item.layer
        });
        
        // //去掉当次接口没 有的人员
        // this.peoplePositionMap.forEach((value, key) => {
        //     if(value.counter !== this.peoplePositionCounter){
        //         this.peoplePositionMap.delete(key);
        //         if(value.label){
        //             this.labelManger.removeLabel(value.label);
        //         }

        //     }
        // });
    }

    createPeopleLogoElement(src, info, onClick, onDbclick){
        // 唯一标识id
        let id = info.deviceNo

        //全部的dom
        let divDom = document.createElement('div');
        divDom.className = 'newCreatedDiv'
        divDom.style.display = 'inline-block'
        divDom.style.pointerEvents = 'auto';
        // divDom.style.transform = 'translate(-50%, -50%)';  //不生效
        divDom.id = `${id}_con`
        divDom.name = info.empName
        divDom.onclick = onClick
        divDom.ondblclick= onDbclick

        //上面的框
        let ChildDivDom = document.createElement('div');
        ChildDivDom.innerHTML = info.domText
        ChildDivDom.style.textAlign = 'center'
        ChildDivDom.style.background = '#FFDD9BFF'
        ChildDivDom.style.backgroundColor = '#FFDD9BFF'
        ChildDivDom.style.color= '#000000FF'
        ChildDivDom.style.display = 'inline-block'
        ChildDivDom.style.padding = '2px'
        ChildDivDom.id = `${id}_top`

        //下面的图片
        let imgDom = document.createElement('img');
        //imgDom.src = 'http://119.167.68.82:50011/fileStatic/init/%E8%93%9D%E5%B8%BD.png'
        imgDom.src = src
        imgDom.style.width = '30px'
        imgDom.style.height = '33px'
        imgDom.style.display = 'block'
        imgDom.style.margin = '0 auto'
        imgDom.id = `${id}_img`

        //把框和图片放进去
        divDom.appendChild(ChildDivDom);
        divDom.appendChild(imgDom);
        return divDom
    }

    
    // 停止人员定位
    stopPerMove(){
        this.hasClose = true
        clearTimeout(this.timer)
        this.personGroup.clear()
        this.peoplePositionMap.clear();
        this.timer = null;
        this.personCount = 0
    }


}

