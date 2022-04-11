import React from 'react';
import { Menu } from 'antd';
import './App.css';
import Three1 from './page/three/three1';
import Three2 from './page/three/three2';
import Three3 from './page/three/three3';
import Game3d from './page/three/game3d/index.js';
import AntdPage from './page/antdPage/index.tsx';

const pageEnum = {
  antd: 'antd',
  three1: 'three1',
  three2: 'three2',
  three3: 'three3',
  game3d: 'game3d'
};

function App() {
  const [current, setCurrent] = React.useState(pageEnum.antd);

  const currentDom = React.useMemo(() => {
    switch (current) {
      case pageEnum.antd:
        return <AntdPage />;
      case pageEnum.three1:
        return <Three1 />;
      case pageEnum.three2:
        return <Three2 />;
      case pageEnum.three3:
        return <Three3 />;
      case pageEnum.game3d:
        return <Game3d />;
    }
  }, [current]);

  return (
    <div className="App">
      <Menu
        onClick={(e) => {
          setCurrent(e.key);
        }}
        selectedKeys={[current]}
        mode="horizontal">
        <Menu.Item key={pageEnum.antd}>{pageEnum.antd}</Menu.Item>
        <Menu.Item key={pageEnum.three1}>{pageEnum.three1}</Menu.Item>
        <Menu.Item key={pageEnum.three2}>{pageEnum.three2}</Menu.Item>
        <Menu.Item key={pageEnum.three3}>{pageEnum.three3}</Menu.Item>
        {/* <Menu.Item key={pageEnum.game3d}>{pageEnum.game3d}</Menu.Item> */}
      </Menu>
      {currentDom}
    </div>
  );
}

export default App;
