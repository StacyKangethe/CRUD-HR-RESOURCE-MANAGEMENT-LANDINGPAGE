import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button,Avatar } from 'antd';
import { StepBackwardOutlined } from '@ant-design/icons';


const ViewRecords = ({ selectedRecord, onBack}) => {
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    fetchRandomProfileImage();
  }, []);

  const fetchRandomProfileImage = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const profileImage = data.results[0].picture.large;
    setProfileImageUrl(profileImage);
  };

  return (
    <div>
        <Button type="primary" onClick={onBack} style={{ marginBottom: '16px', backgroundColor: '#1d4296' }}>
            <StepBackwardOutlined />
            Back to Table
        </Button>

        <Card  title="Employee Details">
          <Row gutter={16} >
              <Col span={6}>
                <Avatar
                  size={180}
                  icon={ <img src={profileImageUrl} alt="Random Profile" /> }
                />
                
              </Col>
              <Col span={18}>
                  <p>Full Name: <span>{selectedRecord?.firstName}</span> <span>{selectedRecord?.lastName}</span></p>
                  <p>Email: <span>{selectedRecord?.email}</span> </p>
                  <p>Address: <span>{selectedRecord?.address}</span></p>
                  <p>Gender: <span>{selectedRecord?.gender}</span></p>
                  <p>Marital Status: <span>{selectedRecord?.maritalStatus}</span></p>
                  <p>Department: <span>{selectedRecord?.department}</span></p>
                  <p>Role: <span>{selectedRecord?.role}</span></p>
              </Col>
          </Row>
        </Card>



    </div>
  );
};

export default ViewRecords;

