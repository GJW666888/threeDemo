import React from 'react';
import { Menu } from 'antd';
import './App.css';
import Three1 from './page/three/three1';
import Three2 from './page/three/three2';
import Three3 from './page/three/three3';
import AntdPage from './page/antdPage/index.tsx';

const pageEnum = {
  antd: 'antd',
  three1: 'three1',
  three2: 'three2',
  three3: 'three3'
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
      </Menu>
      {currentDom}
    </div>
  );
}

export default App;
