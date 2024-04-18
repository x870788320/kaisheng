


const videoWnData = [
    {
        id: 1,
        name: '明火',
        key: '4'
    },
    {
        id: 2,
        name: '烟雾',
        key: 'ws'
    },
    {
        id: 3,
        name: '抽烟',
        key: '0'
    },
    {
        id: 4,
        name: '睡岗',
        key: '4'
    },
    {
        id: 5,
        name: '翻越围栏',
        key: '2'
    },
    {
        id: 6,
        name: '区域入侵',
        key: '5'
    },
    {
        id: 7,
        name: '人员离岗',
        key: '1'
    },
    {
        id: 8,
        name: '人员聚集',
        key: '5'
    },
    {
        id: 9,
        name: '打电话',
        key: '4'
    },
    {
        id: 10,
        name: '未佩戴安全帽',
        key: '45'
    },
    {
        id: 11,
        name: '未着装工作服',
        key: '1'
    },
]

const personWnData = [
    {
        id: 1,
        name: '越界',
        key: '5'
    },
    {
        id: 2,
        name: '滞留',
        key: '4'
    },
    {
        id: 3,
        name: '超员',
        key: '5'
    },
    {
        id: 4,
        name: '缺员',
        key: '4'
    },
    {
        id: 5,
        name: '静止',
        key: '5'
    },
    {
        id: 6,
    },
    {
        id: 7,
    },
    {
        id: 8,
    },
]

const denginWnData = [
    {
        id: 1,
        name: '液位',
        key: '2'
    },
    {
        id: 2,
        name: '压力',
        key: '1'
    },
    {
        id: 3,
        name: '温度',
        key: '4'
    },
]

export const alarmNav = [
    {
        id: 1,
        name: '视频报警',
        title:'累计视频报警',
        list: videoWnData,
        key: 'd'
    },
    {
        id: 2,
        name: '人员报警',
        title:'人员报警',
        list: personWnData,
        key: 'b'
    },
    {
        id: 3,
        name: '重大危险源',
        title:'重大危险源',
        list: denginWnData,
        key: 'c'
    },
]