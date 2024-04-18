
import Axios from 'axios'

export const MP = ak => new Promise(function(resolve, reject) {
		window.init = function() {
			resolve(BMap)
		}
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
		script.onerror = reject;
		document.head.appendChild(script);
	})


export const getCity = () => new Promise((res, rej) => {
    MP("7iv4GTjmEoRMLNLWIGQHDb4qFIFKsWYc").then(BMap => {
        const geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(position => {
            // console.log(position)
            res({
                city: position.address.city,
                prov:position.address.province
            })
        }, 
        e => rej(e),
        {provider: 'baidu'});
    })
})

export const getWeather = async loc => {
    let cityInfo = await getCity().then(r => r)
    let city = loc || cityInfo.city
    let def = {
        type: '晴',
        tem: ``
    }
    return new Promise((res, rej) => 
        Axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + city).then(weather => {
            let list = weather.data.data.forecast;
            if (!list || !list[0]) {
                rej(def)
            };
            let today = list[0]
            let high = today.high.split(" ")[1];
            let low = today.low.split(" ")[1];
            
            res({
                type: today.type,
                tem: `${low} ~ ${high}`
            })
        }).catch(err => {
            console.log('err',err)
            rej(def)
        })
    )
    
}