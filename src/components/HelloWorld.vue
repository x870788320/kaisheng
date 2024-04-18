<script setup>
import { ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import Axios from 'axios'
	import { getWeather } from '../Utils/map';

defineProps({
  msg: String
})

  // const props = defineProps({
  //   msg: String,
  // })
  const emit = defineEmits(['click'])
  const sonClick = () => {
    emit('click')
  }

  const store = useStore()

  console.log(store)


const count = ref(0)



    // Axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=青岛&key=9f79f6c3c5a795d384d19b511aa72abe').then(weather => {
    //     // const d = weather.data.lives[0]
    //     // this.setState({
    //     //     weather: weather.data.lives[0]
    //     // })
    //     console.log(weather)
    // }).catch(err => {
    //     console.log('e',err)
    // })

    //     Axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + '青岛市').then(data => {
    //     // const d = weather.data.lives[0]
    //     // this.setState({
    //     //     weather: weather.data.lives[0]
    //     // })
    //     console.log(data)
    //     // var list = data.data.forecast;
    //     //         if (list.length < 3) {
    //     //             return;
    //     //         }
    //     //         var wList = [];
    //     //         for (var i = 0; i < 3; i++) {
    //     //             var item = list[i];
    //     //             var high = item.high.split(" ")[1];
    //     //             var low = item.low.split(" ")[1];
    //     //             wList.push({
    //     //                 day: item.date.slice(-3),
    //     //                 type: item.type,
    //     //                 temperature: high + "/" + low
    //     //             });
    //     //         }
    // }).catch(err => {
    //     console.log('e',err)
    // })

    function getLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log(pos)
          // const coords = pos.coords || {}
          // const { latitude, longitude } = coords
          // const position = wgs84ToGCJ02(longitude, latitude)
          resolve(pos)
        }, (e) => {
          reject(e)
        }, {
          timeout: 10000,
          maximumAge: 10000
        })
      })
    }

    function refreshLocalCity(complete) {
      AMap.plugin('AMap.CitySearch', function () {
          new AMap.CitySearch().getLocalCity(function (status, result) {
            console.log(status)
            console.log(result)
              // if (status === 'complete' && result.info === 'OK') {
              //     $scope.$apply(function () {
              //         $scope.city = result.city;
              //     });
              //     complete && complete();
              // }
          })
      });
  }

  
						// MP("7iv4GTjmEoRMLNLWIGQHDb4qFIFKsWYc").then(BMap => {
						// 	// that.map = new BMap.Map("allmap"); // 创建Map实例
            //   const geolocation = new BMap.Geolocation();
            //   // var _this = this
            //   geolocation.getCurrentPosition(function getinfo(position){
            //       console.log(position)
            //       // let city = position.address.city; //获取城市信息
            //       // let province = position.address.province; //获取省份信息
            //   }, function(e) {
            //       // _this.LocationCity = "定位失败"
            //   }, {provider: 'baidu'});
						// 	// var point = new BMap.Point(116.404, 39.915); // 创建点坐标
						// 	// that.map.centerAndZoom(point, 15);
						// 	// resolve(true);
						// })

// getLocation().then(res => console.log(res))
 

    // setInterval(() => {
    //     this.setState({
    //         sysTime: Util.timeFormat(new Date().getTime())
    //     })
    // });

    // Axios.get({
    //         url:  encodeURI("http://wthrcdn.etouch.cn/weather_mini?city=" + '青岛');,
    //         dataType: "json",
    //         async: false,
    //         success: function (data) {
    //             var list = data.data.forecast;
    //             if (list.length < 3) {
    //                 return;
    //             }
    //             var wList = [];
    //             for (var i = 0; i < 3; i++) {
    //                 var item = list[i];
    //                 var high = item.high.split(" ")[1];
    //                 var low = item.low.split(" ")[1];
    //                 wList.push({
    //                     day: item.date.slice(-3),
    //                     type: item.type,
    //                     temperature: high + "/" + low
    //                 });
    //             }
    //             $scope.$apply(function () {
    //                 $scope.weatherList = wList;
    //             });
    //         }
    //     });

    const getW = async () => {
      let wea = await getWeather().then(r => r).catch(e => e)
      console.log(wea)
      return wea
    }
    

  // let aa = awaitgetWeather().then(res => res)
  // console.log(getW())


</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
