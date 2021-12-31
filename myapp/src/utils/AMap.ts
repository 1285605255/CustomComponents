import AMapLoader from '@amap/amap-jsapi-loader';

export let getAMap = (id = 'container', config = {}) => {
  return new Promise((yes, no) => {
    AMapLoader.load({
      key: '46b037a6cc07f7eb44b35a2ad953b91d', // Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['MarkerCluster'], //插件列表
    })
      .then((AMap) => {
        let map = new AMap.Map(id, {
          viewMode: '3D',//使用3D视图
          // pitch: 60,
          // rotation: 0,
          //   mapStyle: 'amap://styles/3327226da7644a927631a987e7b74ef7', // 更改地图加载样式
          zooms: [1, 24],
          center: [121.472644, 31.231706],
          showIndoorMap: true,
          resizeEnable: true,
          pitchEnable: true,
          skyColor: "#000",
          layers: [],//使用多个图层 
          ...config
        });
        yes({
          map,
          AMap
        });
      })
      .catch((e) => {
        console.log('高德地图错误', e);
        no(e);
      });
  });
};