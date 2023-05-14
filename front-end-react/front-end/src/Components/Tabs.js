
import React, { useState, useEffect } from 'react';
import { UserAddOutlined, DollarOutlined, CalendarOutlined, UnorderedListOutlined} from '@ant-design/icons';
import { Menu, Row, Col } from 'antd';
import InputForm from './InputForm';
import DisplayTable from './DisplayTable';
import Finance from './Finance';
import Birthdays from './Birthdays';

const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/employees');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onTabChange = (e) => {
    setSelectedTab(e.key);
  };

  useEffect(() => {
    console.log('Selected tab:', selectedTab);
  }, [selectedTab]);

  return (
    <div>
      <Row>
        <Col span={4} style={{marginTop: "1em", marginBottom: "1em"}}>
          <Menu
            theme="dark"
            onClick={onTabChange}
            mode="vertical"
            selectedKeys={[selectedTab]}
            style={{ height: '100%', borderRight: 0, borderRadius: "0.5em", padding: "1em", backgroundColor: '#1d4296'}}
          >
            <Menu.Item key="1"><UserAddOutlined />  New Employee</Menu.Item>
            <Menu.Item key="2"><UnorderedListOutlined />  All Employees</Menu.Item>
            <Menu.Item key="3"><DollarOutlined />  Finance</Menu.Item>
            <Menu.Item key="4"><CalendarOutlined />  Birthdays</Menu.Item>
          </Menu>
        </Col>
        {/* //pane on the right side */}
        <Col span={20} style={{ padding: '1em' }}>
          {selectedTab === '1' && <InputForm />}
          {selectedTab === '2' && <DisplayTable   />}
          {selectedTab === '3' && <Finance data={data} />}
          {selectedTab === '4' && <Birthdays data={data} />}
        </Col>
      </Row>
    </div>
  );
};

export default TabComponent;

