import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Three() {
  const threeRef = React.useRef(null);

  React.useEffect(() => {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();

    // 辅助坐标系  参数2500表示坐标系大小，可以根据场景大小去设置
    // var axisHelper = new THREE.AxisHelper(2500);
    // scene.add(axisHelper);

    // var loader = new THREE.MMDLoader(); //创建一个加载器
    // var helper = new THREE.MMDHelper();
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(800, 400, 600); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 400; //三维场景显示范围控制系数，系数越大，显示的范围越大

    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 200, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    threeRef.current.innerText = '';
    threeRef.current.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参

    // 渲染函数
    const render = () => {
      renderer.render(scene, camera); //执行渲染操作
      requestAnimationFrame(render); //请求再次执行渲染函数render
    };
    render();
    new OrbitControls(camera, renderer.domElement);
  }, []);

  return <div ref={(e) => (threeRef.current = e)}></div>;
}
