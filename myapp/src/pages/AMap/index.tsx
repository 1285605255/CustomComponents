import React, { useState, useEffect } from 'react';
import { Map } from 'react-amap';
import * as THREE from 'three';

const data = [
  [116.52, 39.79],
  [116.54, 39.79],
  [116.56, 39.79],
];

const LoadAMap = () => {
  let path: any;
  let scene: any;
  let renderer: any;
  let meshes: any = [];
  const plugins: any = ['CustomLayer'];
  const events: any = {
    created: (map: any) => {
      getGeocoder(window.AMap, map);
    },
  };

  const getGeocoder = async (AMap: any, map: any) => {
    function buildPath() {
      var path = [];
      var center = map.lngLatToContainer( [116.306206, 39.975468]);

      for (let k = 0; k < 6; k += 1) {
        var ag = ((Math.PI * 60) / 180) * k;
        var x = center.x + Math.cos(ag) * 50;
        var y = center.y + Math.sin(ag) * 50;
        path.push((k == 0 ? 'M' : 'L') + x + ' ' + y);
      }
      return path.join(' ') + ' Z';
    }
    function onRender() {
      //更新路径
      var newPath = buildPath();
      path.setAttribute('d', newPath);
    }
    const getAMap = await AMap;
    var size = map.getSize();
    var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    canvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    canvas.setAttribute('width', size.width);
    canvas.setAttribute('height', size.height);

    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.onclick = function () {
      console.log('svg path clicked');
    };
    var styleText = [];
    styleText.push('stroke:red');
    styleText.push('fill:green');
    styleText.push('fill-opacity:0.3');
    path.style.cssText = styleText.join(';');

    canvas.appendChild(path);
    var customLayer = new getAMap.CustomLayer(canvas, {
      // zooms: [3, 8],
      // alwaysRender:true,
      zIndex: 300,
    });
    customLayer.render = onRender;
    customLayer.setMap(map);
  };

  return (
    <Map
      events={events}
      plugins={plugins}
      amapkey={'46b037a6cc07f7eb44b35a2ad953b91d'}
      version="2.0"
    />
  );
};
export default LoadAMap;
