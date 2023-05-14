import { Col, Row, Image } from 'antd';
import './App.css';
import TabComponent from './Components/Tabs';

function App() {
  return (
    <div className="App">


      <Row gutter={[16, 16]} align="middle">
        <Col span={6}>
          <Image style={{ width: '100px', height: '50px' }} src="https://www.reshot.com/preview-assets/icons/TE4KBWUCJV/hr-information-system-TE4KBWUCJV.svg" alt="logo"/>
        </Col>
        <Col span={18}>
        <h1 style={{ margin: 0 }}>HR MANAGEMENT SYSTEM</h1>
        </Col>
      </Row>

      <TabComponent />
    </div>
  );
}

export default App;
