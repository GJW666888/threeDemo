import React from 'react';
import { Menu } from 'antd';
import './App.css';
import Three1 from './page/three/three1';
import Three2 from './page/three/three2';
import Three3 from './page/three/three3';
import AntdPage from './page/antdPage/index.tsx';

function App() {
  const [current, setCurrent] = React.useState('antd');

  const currentDom = React.useMemo(() => {
    if (current === 'antd') {
      return <AntdPage />;
    }
    if (current === 'three1') {
      return <Three1 />;
    }
    if (current === 'three2') {
      return <Three2 />;
    }
    if (current === 'three3') {
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
        <Menu.Item key="antd">antd</Menu.Item>
        <Menu.Item key="three1">three1</Menu.Item>
        <Menu.Item key="three2">three2</Menu.Item>
        <Menu.Item key="three3">three3</Menu.Item>
      </Menu>
      {currentDom}
    </div>
  );
}

export default App;
