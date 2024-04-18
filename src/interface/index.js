import { get, post } from './axios'


export const getRiskData = params => get("public/screen/getStatics", params)

export const getLoc = params => get('sft/pub/data/loc/data')

//获取设备gds值
export const getGDSData = params => get('sft/pub/data/gds/list')

//获取二道门人数
export const getTwoDoorCount = params => get('sft/pub/data/per/count')



// http://lyrf.zhihuihse.com//public/screen/getStatics/11

// https://222.173.243.142:7788/sft/pub/data/gds/list

// export const getGdsData = params => get('sft/pub/data/loc/data')