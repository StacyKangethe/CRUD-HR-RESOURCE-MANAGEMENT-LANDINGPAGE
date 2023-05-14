import { useState } from "react";
import moment from 'moment';
import { Form, Input, Button, message, Select, DatePicker, Checkbox } from 'antd';
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

const { Option } = Select;

function InputForm() {
  const [form] = Form.useForm(); //Clear form
  const [data, setData] = useState({ firstName: '', lastName: '', address: '', email: '', gender: '', maritalStatus: '', department: '', role: '', dob: '', workplace: '', leave: false, salary: ''});
  const [submitted, setSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Employee data was submitted successfully!',
    });
  };

  const handleDateChange = (date, dateString) => {
    setData((data) => ({
      ...data,
      dob: dateString,
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setData((data) => ({
      ...data,
      leave: checked,
    }));
  };
  

  const serverHost = 'http://localhost:4000';
  async function addEmployee(employee) {
    const url = serverHost + '/employees';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    }
    const response = await fetch(url, options);
    if (response.status === 200) {
      setSubmitted(true);
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  }

  //handle submit
  const onFinish = async () => {
    const newEmployee = { ...data, id: uuidv4() };
    addEmployee(newEmployee);
    console.log("Received values", newEmployee);
    form.resetFields(); // Clear form
    success();
  }


  return (
    <div style={{ maxWidth: 800, paddingLeft: "1em"}}>
      {contextHolder}
      <h2>Create New Employee</h2>
      <Form form={form} labelCol={{span: 6}} size="large"  onFinish={onFinish} >
        <Form.Item  
            label="First Name:"
            name="firstName"
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

          <Input name="firstName" value={data.firstName} onChange={handleChange} placeholder="Input First Name"/>
        </Form.Item>

        <Form.Item  
            label="Last Name:"
            name="lastName"
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
          <Input name="lastName" value={data.lastName} onChange={handleChange} placeholder="Input Last Name"/>
        </Form.Item>

        <Form.Item  
            label="Email:"
            name="email"
            rules={[
              {
                required: true,
                message: 'Email is required',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}

            style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                }}>
          <Input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Input Email"/>
        </Form.Item>

        <Form.Item  
            label="Address:"
            name="address"
            rules={[
              {
                required: true,
                message: 'Address is required',
              },
            ]}

            style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
                }}>
          <Input name="address" value={data.address} onChange={handleChange} placeholder="Input Address"/>
        </Form.Item>

        <Form.Item 
            label="Gender"  
            name="gender"
            rules={[
              {
                required: true,
                message: 'Gender is required',
              },
            ]}

            style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            }}>
            <Select 
                placeholder="Select gender"
                name="gender"
                value={data.gender}
                onChange={(value) => handleChange({ target: { name: 'gender', value } })}   >

                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
            </Select>
        </Form.Item>
        <Form.Item 
            label="Marital Status:"
            name="maritalStatus"
            rules={[
              {
                required: true,
                message: 'Marital status is required',
              },
            ]}   

            style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            margin: '0 8px',
            }}>
            <Select 
                placeholder="Select Marital Status"
                name="maritalStatus"
                value={data.maritalStatus}
                onChange={(value) => handleChange({ target: { name: 'maritalStatus', value } })} >

                <Option value="single">Single</Option>
                <Option value="married">Married</Option>
            </Select>
        </Form.Item>

        <Form.Item 
            label="Department:" 
            name="department"
            rules={[
              {
                required: true,
                message: 'Department is required',
              },
            ]} 

            style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            }}>
            <Select 
                placeholder="Select Department"
                name="department"
                value={data.department}
                onChange={(value) => handleChange({ target: { name: 'department', value } })}>

                <Option value="administration">Administration</Option>
                <Option value="ict">ICT</Option>
                <Option value="transport">Transport</Option>
                <Option value="catering">Catering</Option>
            </Select>
        </Form.Item>

        <Form.Item 
            label="Role:"
            name="role" 
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
          <Input name="role" value={data.role} onChange={handleChange} placeholder="Input Role"/>
        </Form.Item>

        <Form.Item 
            label="Workplace:" 
            name="workplace"
            rules={[
              {
                required: true,
                message: 'Workplace is required',
              },
            ]} 

            style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            margin: '0 8px',
            }}>
            <Select 
                placeholder="Select Workplace"
                name="workplace"
                value={data.workplace}
                onChange={(value) => handleChange({ target: { name: 'workplace', value } })}>

                <Option value="remote">Remote</Option>
                <Option value="office">Office</Option>
            </Select>
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
          }}
        >
          <Input name="salary" value={data.salary} onChange={handleChange} placeholder="Input Salary" />
        </Form.Item>

        <Form.Item  
            label="Date Of Birth:"
            name="dob"
            rules={[
              {
                required: true,
                message: 'DOB is required',
              },
            ]}

            style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                }}>
          <DatePicker
            name="dob"
            value={data.dob ? moment(data.dob, 'YYYY-MM-DD') : null}
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
          <Checkbox onChange={handleCheckboxChange} name="leave" checked={data.leave}></Checkbox>
        </Form.Item>

        <Form.Item style={{ display: "flex"}}>
          <Button htmlType="submit" style={{ backgroundColor: "black",  color: '#ffffff', borderRadius: '0.5em', border: 'none'}} > 
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default InputForm;
