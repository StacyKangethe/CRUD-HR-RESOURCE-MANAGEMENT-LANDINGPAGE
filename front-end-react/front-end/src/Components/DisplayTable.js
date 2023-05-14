import React, { useState, useEffect } from 'react';
import { Table, Space, message, Popconfirm, Row, Col } from 'antd';
import { Button, Modal, Form, Input, Select, DatePicker, Checkbox} from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import moment from 'moment';
import ViewRecords from './ViewRecord';

const { Option } = Select;

const DisplayTable = ( ) => {
  const [form] = Form.useForm(); //for validation
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState('');
  const [view, setView] = useState(false);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Data updated successfully!',
    });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((record) =>
    record.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
    record.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
    record.email.toLowerCase().includes(searchText.toLowerCase()) ||
    record.department.toLowerCase().includes(searchText.toLowerCase()) ||
    record.role.toLowerCase().includes(searchText.toLowerCase()) ||
    record.workplace.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDateChange = (date, dateString) => {
    setSelectedRecord((selectedRecord) => ({
      ...selectedRecord,
      dob: dateString,
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setSelectedRecord((selectedRecord) => ({
      ...selectedRecord,
      leave: checked,
    }));
  };
  

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/employees');
      const jsonData = await response.json();
      setData(jsonData);

      // // Calculate total salary expenses
      // const totalExpense = jsonData.reduce((acc, employee) => acc + parseFloat(employee.salary), 0);
      // setTotalSalaryExpense(totalExpense);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //handle delete
  const deleteRecord = async (record) => {
    try {
      const response = await fetch(`http://localhost:4000/employees/${record.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      } else {
        throw new Error('Error deleting the record');
      }
    } catch (error) {
      console.error('Error deleting the record:', error);
    }
  };

  //handle save changes bbutton on the pop up modal
const handleOk = async () => {
  try {
      const response = await fetch(`http://localhost:4000/employees/${selectedRecord.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedRecord),
      });
      if (response.ok) {
      fetchData();
      setIsModalOpen(false);
      } else {
      const responseBody = await response.json();
      console.error('API error response:', responseBody);
      throw new Error('Error updating the record');
      }
  } catch (error) {
      console.error('Error updating the record:', error);
  }
  success();
  };


  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (selectedRecord) => {
    setSelectedRecord(selectedRecord);
    setIsModalOpen(true);
  };


  //handle view button
  const handleView = (record) => {
    setView(true);
    setSelectedRecord(record);
  };


  //handle popConfirm
  const confirm = (e, record) => {
    deleteRecord(record);
    console.log(e);
    message.success('Deleted successfully!');
    setIsModalOpen(false);
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Record not deleted!');
  };

  const handleBack = () => {
    setView(false);
  };

    //handle cancel on pop up modal
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
  
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setSelectedRecord({ ...selectedRecord, [name]: value });
    };

   
  

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      responsive: ['xs'],
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        responsive: ['xs'],
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm'],
    },
    // {
    //   title: 'Gender',
    //   dataIndex: 'gender',
    //   key: 'gender',
    // },
    // {
    //   title: 'Marital Status',
    //   dataIndex: 'maritalStatus',
    //   key: 'maritalStatus',
    // },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      responsive: ['md'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      responsive: ['md'],
    },
    // {
    //   title: 'DOB',
    //   dataIndex: 'dob',
    //   key: 'dob',
    // },
    // {
    //   title: 'Workplace',
    //   dataIndex: 'workplace',
    //   key: 'workplace',
    // },
    // {
    //   title: 'Leave',
    //   dataIndex: 'leave',
    //   key: 'leave',
    //   render: leave => (leave ? 'true' : 'false'),
    // },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      responsive: ['lg'],
    },
    {
      title: 'Actions',
      key: 'action',
      responsive: ['lg'],
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>

          <Button type="link" onClick={() => showModal(record)}>
            <EditFilled />
            Edit
          </Button>

          <Popconfirm
            title="Delete record!"
            description="Are you sure you want to delete this record?"
            onConfirm={(e) => confirm(e, record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              <DeleteFilled />
              Delete
            </Button>
          </Popconfirm>

        </Space>
      ),
    }
  ];

  return (
    <div>
      {contextHolder}

      {!view ? (
        <div>
          <div style={{ maxWidth: 800, paddingLeft: "1em"}}>
            <Row>
            <Col span={12} >
              <Input.Search
                placeholder="Search employees by name, email, department, role"
                value={searchText}
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
              />
            </Col>
          </Row>
          <Table dataSource={filteredData} columns={columns} rowKey="id" />
          </div>
            {/* Pop up Modal */}
            <Modal okText="Save Changes" title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <h2>UPDATE EMPLOYEE RECORDS</h2>
            <Form form={form} labelCol={{span: 6}} size="large"  >
              <Form.Item  
                  label="First Name:"
                  rules={[
                    {
                      required: true,
                      message: 'First name is required',
                    },
                  ]}
  
                  style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      }}>
                <Input name="firstName" value={selectedRecord?.firstName || ''}  onChange={handleChange} placeholder="Input First Name"/>
              </Form.Item>
              <Form.Item  
                  label="Last Name:"
                  rules={[
                    {
                      required: true,
                      message: 'Last name is required',
                    },
                  ]}
                  style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      margin: '0 8px',
                      }}>
                <Input name="lastName" value={selectedRecord?.lastName || ''} onChange={handleChange}  placeholder="Input Last Name"/>
              </Form.Item>
  
              <Form.Item  label="Address:"
                  style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      }}>
                <Input name="address" value={selectedRecord?.address || ''}  onChange={handleChange} placeholder="Input Address"/>
              </Form.Item>
              <Form.Item  label="Email:"
                  style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      margin: '0 8px',
                      }}>
                <Input type='email' name="email" value={selectedRecord?.email || ''} onChange={handleChange} placeholder="Input Email"/>
              </Form.Item>
  
              <Form.Item label="Gender"       
                  style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  }}>
                  <Select 
                      placeholder="Select Gender"
                      name="gender"
                      value={selectedRecord?.gender || ''}
                      onChange={(value) => handleChange({ target: { name: 'gender', value } })}  >
  
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                  </Select>
              </Form.Item>
              <Form.Item label="Marital Status:"        
                  style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                  }}>
                  <Select 
                      placeholder="Select Marital Status"
                      name="maritalStatus"
                      value={selectedRecord?.maritalStatus || ''}
                      onChange={(value) => handleChange({ target: { name: 'maritalStatus', value } })} >
  
                      <Option value="single">Single</Option>
                      <Option value="married">Married</Option>
                  </Select>
              </Form.Item>
  
              <Form.Item label="Department:"  
                  style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  }}>
                  <Select 
                      placeholder="Select Department"
                      name="department"
                      value={selectedRecord?.department || ''}
                      onChange={(value) => handleChange({ target: { name: 'department', value } })} >
  
                      <Option value="administration">Administration</Option>
                      <Option value="ict">ICT</Option>
                      <Option value="transport">Transport</Option>
                      <Option value="catering">Catering</Option>
                  </Select>
              </Form.Item>
  
              <Form.Item label="Role:"  
                  rules={[
                    {
                      required: true,
                      message: 'Role is required',
                    },
                  ]}  

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}>
                <Input name="role" value={selectedRecord?.role || ''} onChange={handleChange} placeholder="Input Role"/>
              </Form.Item>

              <Form.Item
                label="Salary:"
                name="salary"
                rules={[
                  {
                    required: true,
                    message: 'Salary is required',
                  },
                  {
                    pattern: /^\d+$/,
                    message: 'Salary must be a number',
                  },
                ]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                }}>
                <Input name="salary" value={selectedRecord?.salary || ''} onChange={handleChange} placeholder="Input Salary" />
              </Form.Item>


              <Form.Item 
                  label="Workplace:" 
                  name="workplace"

                  style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                  }}>
                  <Select 
                      placeholder="Select Workplace"
                      name="workplace"
                      value={selectedRecord?.workplace || '' }
                      onChange={(value) => handleChange({ target: { name: 'workplace', value } })}>

                      <Option value="remote">Remote</Option>
                      <Option value="office">Office</Option>
                  </Select>
              </Form.Item>

              <Form.Item  
                  label="Date Of Birth:"
                  name="dob"

                  style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      
                      }}>
                <DatePicker
                  name="dob"
                  value={selectedRecord?.dob ? moment(selectedRecord?.dob, 'YYYY-MM-DD') : null}
                  onChange={handleDateChange}
                  placeholder="Input DOB"
                />
              </Form.Item>

              <Form.Item
                label="On Leave?:"
                name="leave"
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}>
                <Checkbox onChange={handleCheckboxChange} name="leave" checked={selectedRecord?.leave}></Checkbox>
              </Form.Item>
  
            </Form>
        </Modal>
        </div>

      ) : (
        <ViewRecords selectedRecord={selectedRecord} onBack={handleBack} />
      )}

    </div>
  );
};

export default DisplayTable;
