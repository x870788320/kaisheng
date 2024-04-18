


//首字母大写
export const firstCharUpper = str => str.charAt(0).toUpperCase() + str.slice(1); 

//日期时间
const formatNum = n => n.toString()[1] ? n : '0' + n
const weekDays = ['Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.', '七Sun.']
export const formatDate = time => {
    let date = (time && new Date(time)) || new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let weekDay = weekDays[date.getDay() -1]
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return [year, [ month, day].map(formatNum).join('-'), weekDay, [hour, minute, second].map(formatNum).join(':')]
    // return [ month, day].map(formatNum).join('-') +'   ' + weekDay + ' ' +[hour, minute, second].map(formatNum).join(':')
}

const imgFormats = {
    png: import.meta.globEager('../assets/**/*.png'),
    svg: import.meta.globEager('../assets/**/*.svg'),
    jpg: import.meta.globEager('../assets/**/*.jpg'),
}

export const getSrc = (img, pro) => {
    if(!img) return
    let suffix = img.split('.')[1]
    if(!suffix) console.log('img需要带格式', img)
    let proStr = `/${pro}`
    let path = `../assets${pro? proStr: ''}/${img}`;
    let modules = imgFormats[suffix]
    return modules[path].default;
}

//暂时还没想到别的方法
export const getSvgSrc = (img, pro) => {
    if(!img) return
    let proStr = `/${pro}`
    let path = `../assets${pro? proStr: ''}/${img}`;
    const modules = pro? import.meta.globEager(`../assets/*/*.svg`): import.meta.globEager(`../assets/*.svg`);
    return modules[path].default;
}

//这里引入不生效，需要复制到组件
const formanSrc = src =>  new URL(src, import.meta.url).href


//获取范围内随机数
export const randomNum = (start, end) => parseInt(Math.random() * (end - start + 1) + start);


//自动引入
// const modulesFiles = import.meta.globEager('./modules/*.ts')
 
// const modules = Object.keys(modulesFiles).reduce(
//   (modules: { [key: string]: any }, path: string) => {
//     const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
//     modules[moduleName] = modulesFiles[path]?.default
//     return modules
//   },
//   {}
// )
// export default modules