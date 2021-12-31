import React, { useEffect, useState } from 'react';
import { getAMap } from '@/utils/AMap';

interface IProps {
  data: any;
}

const MapMarker: React.FC<IProps> = (props) => {
  useEffect(() => {
    fetchMap(props.data);
  }, [props.data]);

  const fetchMap = async (data: any) => {
    let getMap: any = await getAMap();
    let AMap = getMap.AMap;
    let map = getMap.map;
    map.on('complete', function () {
      const marker = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [121.472644, 31.231706],
        anchor: 'bottom-center',
      });
      map.add(marker);
      console.log('地图加载完成！');
    });
  };

  return <div id="container" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapMarker;
