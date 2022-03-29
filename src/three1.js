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
    var axisHelper = new THREE.AxisHelper(2500);
    scene.add(axisHelper);

    /**建立房子 */
    /**
     * 创建网格模型
     */
    var geometry1 = new THREE.BoxGeometry(400, 10, 200); //创建一个立方体几何对象Geometry
    var material1 = new THREE.MeshLambertMaterial({
      color: 0x00ccff
    }); //材质对象Material
    var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    mesh1.translateX(200); //球体网格模型沿Y轴正方向平移120
    scene.add(mesh1); //网格模型添加到场景中

    var geometry11 = new THREE.BoxGeometry(10, 200, 200); //创建一个立方体几何对象Geometry
    var material11 = new THREE.MeshLambertMaterial({
      color: 0x00ccff
    }); //材质对象Material
    var mesh11 = new THREE.Mesh(geometry11, material11); //网格模型对象Mesh
    mesh11.translateX(5); //球体网格模型沿Y轴正方向平移120
    mesh11.translateY(100); //球体网格模型沿Y轴正方向平移120
    scene.add(mesh11); //网格模型添加到场景中

    var geometry12 = new THREE.BoxGeometry(400, 200, 10); //创建一个立方体几何对象Geometry
    var material12 = new THREE.MeshPhongMaterial({
      color: 0x00ccff
    }); //材质对象Material
    var mesh12 = new THREE.Mesh(geometry12, material12); //网格模型对象Mesh
    mesh12.translateX(200); //球体网格模型沿Y轴正方向平移120
    mesh12.translateZ(-95); //球体网格模型沿Y轴正方向平移120
    mesh12.translateY(100); //球体网格模型沿Y轴正方向平移120
    scene.add(mesh12); //网格模型添加到场景中

    var geometry13 = new THREE.BoxGeometry(10, 200, 200); //创建一个立方体几何对象Geometry
    var material13 = new THREE.MeshPhongMaterial({
      color: 0x00ccff
    }); //材质对象Material
    var mesh13 = new THREE.Mesh(geometry13, material13); //网格模型对象Mesh
    mesh13.translateX(395); //球体网格模型沿Y轴正方向平移120
    mesh13.translateY(100); //球体网格模型沿Y轴正方向平移120
    mesh13.translateZ(0); //球体网格模型沿Y轴正方向平移120
    scene.add(mesh13); //网格模型添加到场景中

    var geometry14 = new THREE.BoxGeometry(400, 10, 200); //创建一个立方体几何对象Geometry
    var material14 = new THREE.MeshLambertMaterial({
      color: 0x00ccff
    }); //材质对象Material
    var mesh14 = new THREE.Mesh(geometry14, material14); //网格模型对象Mesh
    mesh14.translateX(200); //球体网格模型沿Y轴正方向平移120
    mesh14.translateY(100); //球体网格模型沿Y轴正方向平移120
    scene.add(mesh14); //网格模型添加到场景中

    var geometry21 = new THREE.TorusGeometry(400, 10, 200);
    var material21 = new THREE.MeshLambertMaterial({
      color: 0x00ccff
    }); //材质对象Material
    var mesh21 = new THREE.Mesh(geometry21, material21); //网格模型对象Mesh
    mesh21.translateX(200);
    mesh21.rotateX(Math.PI / 2);
    scene.add(mesh21); //网格模型添加到场景中

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
    var s = 1000; //三维场景显示范围控制系数，系数越大，显示的范围越大

    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(400, 400, 400); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    threeRef.current.innerText = '';
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数

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
