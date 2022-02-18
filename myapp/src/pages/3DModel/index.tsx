import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

const indexObj: React.FC = () => {
  useEffect(() => {
    initThree();
  }, []);

  const initThree = () => {
    let camera: any,
      renderScene: any,
      bloomPass: any,
      composer: any,
      scene: any,
      cube: any,
      material: any,
      renderer: any,
      light: any,
      loader: any,
      loaderTexture: any,
      orbitControls: any,
      mixer: any,
      clock: any,
      body: any;
    let container: any = document.getElementById('Subject');
    const created = () => {
      loader = new GLTFLoader(); // 异步渲染模型
      scene = new THREE.Scene(); // 场景
      scene.background = new THREE.Color(0xffffff);
      scene.add(new THREE.AmbientLight(0x404040));
      scene.position.y = -20;
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      // light = new THREE.DirectionalLight(0x888888, 10); // 光线
      clock = new THREE.Clock();
      camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.0006,
        1000,
      );
      camera.position.z = 100;
      scene.add(camera);
      const pointLight = new THREE.PointLight(0xffffff, 1);
      camera.add(pointLight);
    };
    function createCubeMap() {
      return new THREE.CubeTextureLoader().load(
        new Array(6).fill('./start.jpg'),
      );
    }

    // 添加鼠标事件
    const Controls = () => {
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.autoRotate = false;
      // 垂直环绕的距离、上限和下限。
      orbitControls.minPolarAngle = 0;
      orbitControls.maxPolarAngle = Math.PI;
      // 您可以移入和移出多远（仅透视照相机）
      orbitControls.minDistance = 0;
      orbitControls.maxDistance = Infinity;
      orbitControls.enablePan = true; // 设置为false以禁用平移（即垂直和水平平移）
      orbitControls.enableDamping = true; // 设置为false以禁用阻尼（即惯性）
      orbitControls.dampingFactor = 0.5; // 设置阻尼数值
    };
    // 初始化画布
    const init = () => {
      created();
      // Camera()
      Controls();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      addCustomSceneObjects();
      scene.add(light);
    };
    const addCustomSceneObjects = () => {
      var mtlLoader = new MTLLoader();
      // mtlLoader.setPath('/OBJ/');
      mtlLoader.load('weichang/NewWeiChang.mtl', function (material) {
        var objLoader = new OBJLoader();
        objLoader.setMaterials(material);
        //   objLoader.setPath('/OBJ/');
        objLoader.load('weichang/NewWeiChang.obj', function (object) {
          object.traverse(function (item) {
            if (item instanceof THREE.Mesh) {
              var center = new THREE.Vector3();
              item.geometry.computeBoundingBox();
              // item.rotation.x = THREE.Math.degToRad( 90 );
              item.geometry.boundingBox.getCenter(center);
              item.geometry.center();
              item.position.copy(center);
              // var helper = new THREE.BoundingBoxHelper(item, 0xff0000);
              // helper.update();
              // scene.add(helper);

              // item.castShadow = true;
              // item.receiveShadow = true;
            }
          });
          object.scale.set(0.3, 0.3, 0.3);
          scene.add(object);
        });
      });

    
    };
    // 开启渲染

    const animate = function () {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer && mixer.update(delta);
    };
    init();
    animate();
  };
  return <div id="Subject" style={{ height: '100vh' }}></div>;
};
export default indexObj;
