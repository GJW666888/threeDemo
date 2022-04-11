import React from 'react';
import * as THREE from 'three';
import CANNON from 'cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import foxModel from '@/modalFile/钟离/钟离.pmx';

export default function () {
  const [state, setState] = React.useState({
    loadingProcess: 0,
    showLoading: true,
    showResult: false,
    resultText: '失败',
    countdown: 60,
    freeDiscover: false
  });

  React.useEffect(() => {
    // 场景初始化
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('canvas.webgl'),
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    // 添加主相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100000);
    camera.position.set(1, 1, -1);
    camera.lookAt(scene.position);
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    // 添加平行光
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // 初始化物理世界
    const world = new CANNON.World();
    // 在多个步骤的任意轴上测试刚体的碰撞
    world.broadphase = new CANNON.SAPBroadphase(world);
    // 设置物理世界的重力为沿y轴向上-10米每二次方秒
    world.gravity.set(0, -10, 0);
    // 创建默认联系材质
    world.defaultContactMaterial.friction = 0;
    const groundMaterial = new CANNON.Material('groundMaterial');
    const wheelMaterial = new CANNON.Material('wheelMaterial');
    const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
      // 摩擦系数
      friction: 0,
      // 恢复系数
      restitution: 0,
      // 接触刚度
      contactEquationStiffness: 1000
    });
    world.addContactMaterial(wheelGroundContactMaterial);

    // 渲染星空
    // const textureLoader = new THREE.TextureLoader();
    // const shaderPoint = THREE.ShaderLib.points;
    // const uniforms = THREE.UniformsUtils.clone(shaderPoint.uniforms);
    // uniforms.map.value = textureLoader.load(snowflakeTexture);
    // for (let i = 0; i < 1000; i++) {
    //   sparkGeometry.vertices.push(new THREE.Vector3());
    // }
    // const sparks = new THREE.Points(
    //   new THREE.Geometry(),
    //   new THREE.PointsMaterial({
    //     size: 2,
    //     color: new THREE.Color(0xffffff),
    //     map: uniforms.map.value,
    //     blending: THREE.AdditiveBlending,
    //     depthWrite: false,
    //     transparent: true,
    //     opacity: 0.75
    //   })
    // );
    // sparks.scale.set(1, 1, 1);
    // sparks.geometry.vertices.map((spark) => {
    //   spark.y = Math.randnum(30, 40);
    //   spark.x = Math.randnum(-500, 500);
    //   spark.z = Math.randnum(-500, 500);
    //   return true;
    // });
    // scene.add(sparks);

    // 生成地形
    const cannonHelper = new CANNON.CannonHelper(scene);
    var heightMapImage = 10000,
      sizeX = 128,
      sizeY = 128,
      minHeight = 0,
      maxHeight = 60,
      check = null;
    Promise.all([
      // 加载高度图
      cannonHelper.img2matrix.fromUrl(heightMapImage, sizeX, sizeY, minHeight, maxHeight)()
    ]).then(function (data) {
      var matrix = data[0];
      // 地形体
      const terrainBody = new CANNON.Body({ mass: 0 });
      // 地形形状
      const terrainShape = new CANNON.Heightfield(matrix, { elementSize: 10 });
      terrainBody.addShape(terrainShape);
      // 地形位置
      terrainBody.position.set((-sizeX * terrainShape.elementSize) / 2, -10, (sizeY * terrainShape.elementSize) / 2);
      // 设置从轴角度
      terrainBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
      world.add(terrainBody);
      // 将生成的地形刚体可视化
      cannonHelper.addVisual(terrainBody, 'landscape');
      var raycastHelperGeometry = new THREE.CylinderGeometry(0, 1, 5, 1.5);
      raycastHelperGeometry.translate(0, 0, 0);
      raycastHelperGeometry.rotateX(Math.PI / 2);
      var raycastHelperMesh = new THREE.Mesh(raycastHelperGeometry, new THREE.MeshNormalMaterial());
      scene.add(raycastHelperMesh);
      // 使用 Raycaster检测并更新模型在地形上的位置
      check = () => {
        var raycaster = new THREE.Raycaster(matrix.target.position, new THREE.Vector3(0, -1, 0));
        var intersects = raycaster.intersectObject(terrainBody.threemesh.children[0]);
        if (intersects.length > 0) {
          raycastHelperMesh.position.set(0, 0, 0);
          raycastHelperMesh.lookAt(intersects[0].face.normal);
          raycastHelperMesh.position.copy(intersects[0].point);
        }
        matrix.target.position.y = intersects && intersects[0] ? intersects[0].point.y + 0.1 : 30;
        var raycaster2 = new THREE.Raycaster(matrix.shelterLocation.position, new THREE.Vector3(0, -1, 0));
        var intersects2 = raycaster2.intersectObject(terrainBody.threemesh.children[0]);
        matrix.shelterLocation.position.y = intersects2 && intersects2[0] ? intersects2[0].point.y + 0.5 : 30;
        matrix.shelterLight.position.y = matrix.shelterLocation.position.y + 50;
        matrix.shelterLight.position.x = matrix.shelterLocation.position.x + 5;
        matrix.shelterLight.position.z = matrix.shelterLocation.position.z;
      };
    });

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = async (url, loaded, total) => {
      setState({ ...state, loadingProcess: Math.floor((loaded / total) * 100) });
    };

    var geometry = new THREE.BoxBufferGeometry(0.5, 1, 0.5);
    geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
    const target = new THREE.Mesh(
      geometry,
      new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0
      })
    );
    scene.add(target);

    // var mixers = [],
    //   clip1,
    //   clip2;
    // const gltfLoader = new GLTFLoader(loadingManager);
    // gltfLoader.load(foxModel, (mesh) => {
    //   mesh.scene.traverse((child) => {
    //     if (child.isMesh) {
    //       child.castShadow = true;
    //       child.material.side = THREE.DoubleSide;
    //     }
    //   });
    //   var player = mesh.scene;
    //   player.position.set(this.playPosition.x, this.playPosition.y, this.playPosition.z);
    //   player.scale.set(0.008, 0.008, 0.008);
    //   target.add(player);
    //   var mixer = new THREE.AnimationMixer(player);
    //   clip1 = mixer.clipAction(mesh.animations[0]);
    //   clip2 = mixer.clipAction(mesh.animations[1]);
    //   clip2.timeScale = 1.6;
    //   mixers.push(mixer);
    // });

    // const directionalLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.5);
    // directionalLight.position.set(0, 1, 0);
    // directionalLight.castShadow = true;
    // directionalLight.target = target;
    // target.add(directionalLight);
  }, []);

  const resetGame = () => {};

  const startGame = () => {};

  const discover = () => {};

  return (
    <div id="metaverse">
      <canvas className="webgl"></canvas>
      <div className="tool">
        <div className="countdown">{state.countdown}</div>
        <button className="reset_button" onClick={resetGame}>
          时光倒流
        </button>
        <p className="hint">站得越高看得越远</p>
      </div>
      {state.showLoading ? (
        <div className="loading">
          <div className="box">
            <p className="progress">{state.loadingProcess} %</p>
            <p className="description">游戏描述</p>
            <button
              className="start_button"
              style={{ visibility: state.loadingProcess === 100 ? 'visible' : 'hidden' }}
              onClick={startGame}>
              开始游戏
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      {state.showResult ? (
        <div className="result">
          <div className="box">
            <p className="text">{state.resultText}</p>
            <button className="button" onClick={resetGame}>
              再试一次
            </button>
            <button className="button" onClick={discover}>
              自由探索
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
